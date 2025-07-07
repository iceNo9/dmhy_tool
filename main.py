import requests
import urllib.parse
import re
import os
import yaml
import posixpath
from collections import defaultdict


# 读取配置文件
def load_config(filepath='config.yaml'):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            return yaml.safe_load(f)
    except FileNotFoundError:
        print(f"⚠️ 配置文件未找到: {filepath}")
        return None

# ========== 工具函数 ==========
def sanitize_filename(name: str, max_length=255) -> str:
    """
    清理并截断文件名，默认限制 100 字符，避免路径过长
    """
    name = re.sub(r'[\/\\\:\*\?\"\<\>\|\r\n\t]', '_', name).strip()
    return name[:max_length]


def get_dn_from_magnet(link: str) -> str:
    """
    从磁力链接中提取 dn 字段并清洗
    """
    parsed = urllib.parse.urlparse(link)
    params = urllib.parse.parse_qs(parsed.query)
    dn = params.get('dn', ['untitled'])[0]
    return sanitize_filename(dn)


def load_magnets_from_file(filepath='input.txt') -> list:
    """
    从 input.txt 中读取磁力链接，一行一个
    """
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            lines = [line.strip() for line in f if line.strip().startswith('magnet:?')]
        print(f"📄 成功读取 {len(lines)} 条磁力链接 from {filepath}")
        return lines
    except FileNotFoundError:
        print(f"⚠️ 文件未找到: {filepath}")
        return []


# ========== qBittorrent 接口 ==========
def login_qb(session: requests.Session, host, username, password) -> bool:
    resp = session.post(f"{host}/api/v2/auth/login", data={
        'username': username,
        'password': password
    })
    if resp.status_code == 200 and resp.text == 'Ok.':
        print("✅ 登录成功")
        return True
    else:
        print(f"❌ 登录失败: {resp.status_code} - {resp.text}")
        return False


def push_download(session: requests.Session, host, link, base_save_path):
    dn = get_dn_from_magnet(link)
    if base_save_path:
        save_path = posixpath.join(base_save_path, dn)  # 强制使用 '/' 分隔符
    else:
        save_path = ''
    print(f"➡️ 正在添加任务: {dn}")

    resp = session.post(f"{host}/api/v2/torrents/add", data={
        'urls': link,
        'savepath': save_path,
        'autoTMM': 'false'
    })

    if resp.status_code == 200:
        print("✅ 推送成功")
        return True
    else:
        print(f"❌ 推送失败: {resp.status_code} - {resp.text}")
        return False

def list_completed_torrents(session: requests.Session, host):
    """
    获取所有已完成的种子任务，过滤出 state=='stoppedUP' 的任务，返回过滤后的 JSON 列表。
    """
    resp = session.get(f"{host}/api/v2/torrents/info", params={"filter": "completed"})
    if resp.status_code != 200:
        print(f"❌ 获取任务失败: {resp.status_code} - {resp.text}")
        return []

    torrents = resp.json()
    if not torrents:
        print("ℹ️ 没有已完成的任务。")
        return []
    
    # 统计所有状态出现的次数
    state_counter = defaultdict(int)
    for t in torrents:
        state = t.get('state', 'UNKNOWN')
        state_counter[state] += 1

    print("📊 所有状态统计：")
    for state, count in state_counter.items():
        print(f"  - {state}: {count}")

    # 过滤出 state == 'stoppedUP' 的任务
    filtered = [t for t in torrents if t.get('state') == 'stoppedUP']

    print(f"📋 已完成任务总数: {len(torrents)}，其中 state=='stoppedUP' 的任务数: {len(filtered)}")
    return filtered


def move_one_completed_torrent(session: requests.Session, host, torrents, new_base_path):
    if not torrents:
        print("⚠️ 没有可移动的任务。")
        return

    torrent = torrents[1]
    name = torrent['name']
    old_path = torrent['save_path']
    torrent_hash = torrent['hash']

    print(f"🟡 准备移动任务: {name}")
    print(f"  ↪ 当前路径: {old_path}")

    subdir = posixpath.basename(old_path.rstrip('/'))
    new_path = posixpath.join(new_base_path.rstrip('/'), subdir)
    print(f"  ⏩ 新路径: {new_path}")

    if old_path.rstrip('/') == new_path.rstrip('/'):
        print(f"⚠️ 任务已在目标路径，无需移动: {new_path}")
        return

    resp = session.post(f"{host}/api/v2/torrents/setLocation", data={
        'hashes': torrent_hash,
        'location': new_path
    })

    if resp.status_code == 200:
        print("✅ 移动成功")
    else:
        print(f"❌ 移动失败: {resp.status_code} - {resp.text}")

def move_all_completed_torrents(session: requests.Session, host, torrents, new_base_path):
    """
    批量移动所有已完成任务到 new_base_path，并保留其原始子目录名。
    """
    if not torrents:
        print("⚠️ 没有可移动的任务。")
        return

    moved = 0
    skipped = 0
    failed = 0

    for torrent in torrents:
        name = torrent['name']
        old_path = torrent['save_path']
        torrent_hash = torrent['hash']

        subdir = posixpath.basename(old_path.rstrip('/'))
        new_path = posixpath.join(new_base_path.rstrip('/'), subdir)

        if old_path.rstrip('/') == new_path.rstrip('/'):
            print(f"⏭️ 已在目标路径，跳过: {name}")
            skipped += 1
            continue

        print(f"🔄 移动任务: {name}")
        print(f"  ↪ 原路径: {old_path}")
        print(f"  ⏩ 新路径: {new_path}")

        # 尝试移动
        resp = session.post(f"{host}/api/v2/torrents/setLocation", data={
            'hashes': torrent_hash,
            'location': new_path
        })

        if resp.status_code == 200:
            print("✅ 移动成功\n")
            moved += 1
        else:
            print(f"❌ 移动失败: {resp.status_code} - {resp.text}\n")
            failed += 1

    print(f"\n📦 移动完成：成功 {moved} 个，跳过 {skipped} 个，失败 {failed} 个")


# ========== 主流程 ==========
def main():
    config = load_config()
    if config is None:
        return

    qb = config.get('qBittorrent', {})
    host = qb.get('host')
    username = qb.get('username')
    password = qb.get('password')
    base_save_path = config.get('base_save_path', '')

    session = requests.Session()

    if not login_qb(session, host, username, password):
        return
    
    torrents = list_completed_torrents(session, host)
    move_all_completed_torrents(session, host, torrents, "/Downloads2")

    magnet_links = load_magnets_from_file()
    if not magnet_links:
        return

    success_count = 0
    for link in magnet_links:
        if push_download(session, host, link, base_save_path):
            success_count += 1

    print(f"🎉 共成功推送 {success_count} 个任务，{len(magnet_links) - success_count} 个失败。")



if __name__ == '__main__':
    main()
