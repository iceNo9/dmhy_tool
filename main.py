import requests
import urllib.parse
import re
import os
import yaml

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
def login_qb(session: requests.Session) -> bool:
    """
    登录 qBittorrent Web API
    """
    resp = session.post(f"{QBITTORRENT_HOST}/api/v2/auth/login", data={
        'username': USERNAME,
        'password': PASSWORD
    })
    if resp.status_code == 200 and resp.text == 'Ok.':
        print("✅ 登录成功")
        return True
    else:
        print(f"❌ 登录失败: {resp.status_code} - {resp.text}")
        return False


def push_download(session: requests.Session, link: str):
    """
    推送磁力链接到 qBittorrent
    """
    dn = get_dn_from_magnet(link)
    save_path = os.path.join(BASE_SAVE_PATH, dn) if BASE_SAVE_PATH else ''
    print(f"➡️ 正在添加任务: {dn}")

    resp = session.post(f"{QBITTORRENT_HOST}/api/v2/torrents/add", data={
        'urls': link,
        'savepath': save_path,
        'autoTMM': 'false'
    })

    if resp.status_code == 200:
        print("✅ 推送成功")
    else:
        print(f"❌ 推送失败: {resp.status_code} - {resp.text}")


# ========== 主流程 ==========
def main():
    session = requests.Session()

    if not login_qb(session):
        return

    magnet_links = load_magnets_from_file()
    if not magnet_links:
        return

    for link in magnet_links:
        push_download(session, link)


if __name__ == '__main__':
    main()
