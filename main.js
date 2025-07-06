// ==UserScript==
// @name         动漫花园批量下载_hupo
// @namespace    https://greasyfork.org/zh-CN/scripts/502439
// @version      0.1.01
// @description  为动漫花园（share.dmhy.org）增加批量下载的功能
// @author       hupo
// @match        *://share.dmhy.org/*
// @icon         data:image/x-icon;base64,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
// @grant        GM_setClipboard
// @license      LGPLv3
// @downloadURL https://update.greasyfork.org/scripts/502439/%E5%8A%A8%E6%BC%AB%E8%8A%B1%E5%9B%AD%E6%89%B9%E9%87%8F%E4%B8%8B%E8%BD%BD_%E6%94%B9.user.js
// @updateURL https://update.greasyfork.org/scripts/502439/%E5%8A%A8%E6%BC%AB%E8%8A%B1%E5%9B%AD%E6%89%B9%E9%87%8F%E4%B8%8B%E8%BD%BD_%E6%94%B9.meta.js
// ==/UserScript==

(function() {
    // 调整表格列
    var node = document.querySelector("#topic_list > thead > tr");
    node.children[2].insertAdjacentHTML('beforebegin', node.children[3].outerHTML);
    node.children[2].querySelector('[class="title"]').innerHTML = "";
    for (let i = 1; i < $('#topic_list tr').length; i++) {
        node = document.querySelector("#topic_list > tbody > tr:nth-child("+String(i)+")");
        node.getElementsByClassName("title")[0].insertAdjacentHTML('beforebegin', node.children[3].outerHTML);
        node.children[2].children[0].title ="复制链接";
        node.children[2].removeChild(node.children[2].querySelector('[class="download-pp"]'));
        if (node.children[9].children[0].innerHTML != Cut15Byte(node.children[9].children[0].innerHTML)) {
            node.children[9].children[0].title = node.children[9].children[0].innerHTML;
            node.children[9].children[0].innerHTML = Cut15Byte(node.children[9].children[0].innerHTML);
        }
    }
    // 裁剪大于15字节字符串
    function Cut15Byte(str) {
        //判断字符串全是ascii /^[\x00-\x7F]+$/.test(str)
        //长度小于16的全ascii字符串或长度小于9的非全ascii不裁剪
        if ((/^[\x00-\x7F]+$/.test(str) && str.length < 16) || (!/^[\x00-\x7F]+$/.test(str) && str.length < 9)) {
            return str;
        } else {
            let length = 0;
            for (let i = 0; i < str.length; i++) {
                let charCode = str.charCodeAt(i);
                if ((charCode >= 0x0001 && charCode <= 0x007F) || (charCode >= 0x02B9 && charCode <= 0x036F)) {length += 1;} else {length += 2;}
                if (length>=16) {
                    return str.slice(0, i-1)+"...";
                } else {
                    if (i == str.length) {return str;}
                }
            }
        }
    }
    // 调整表格列宽度
    document.querySelector("#topic_list > thead > tr > th:nth-child(2)").width = "4%";
    document.querySelector("#topic_list > thead > tr > th:nth-child(3)").width = "3%";
    document.querySelector("#topic_list > thead > tr > th:nth-child(5)").width = "2%";
    document.querySelector("#topic_list > thead > tr > th:nth-child(6)").width = "4%";
    document.querySelector("#topic_list > thead > tr > th:nth-child(7)").width = "2%";
    document.querySelector("#topic_list > thead > tr > th:nth-child(8)").width = "2%";
    document.querySelector("#topic_list > thead > tr > th:nth-child(9)").width = "2%";
    document.querySelector("#topic_list > thead > tr > th:nth-child(10)").width = "7%";

})();

function dmhy() {
    var that = this;
    this.init = function () {
        // 复选框
        var tds = $('#topic_list tr td:nth-child(3)');
        tds.append('<input type="checkbox" class="magnet"/>');
        $('.magnet:checkbox').click(function () {
            that.strMagnet();
            console.log("已选中 "+that.gatherMagnet().length+" 项");
        });

        // 复制所选
        $('.nav_title:eq(1) .fl,.nav_title:eq(2)').append('<a class="download-all" style="color:yellow;margin-left: 24px;"><i class="download-arrow arrow-magnet" style="margin-right: 4px;"title="复制所选"></i>复制所选链接至剪贴板</a>');
        $('#topic_list thead tr th:nth-child(3) span').append('<a class="download-all" style="color:yellow;"><i class="download-arrow arrow-magnet" title="复制所选">&nbsp;</i></a>');
        $('.download-all').click(function (e) {
            e.preventDefault();
            if (that.gatherMagnet().length == 0) {
                toast("未选中任何条目");
                return;
            }
            GM_setClipboard(that.strMagnet()+"\r\n");
            console.log("已复制 "+that.gatherMagnet().length+" 项");
            toast("已复制　"+that.gatherMagnet().length+" 项　选中条目链接");
        });
        // 全选
        $('#topic_list thead tr th:nth-child(3) span').append('<input class="select-all" type="checkbox" style="margin-left: 3px;" title="全选"></a>');
        $('.select-all').click(function () {
            if ($('.magnet:checkbox').length !== $('.magnet:checkbox:checked').length) {
                $('.magnet:checkbox').attr('checked', true);
            } else {
                $('.magnet:checkbox').attr('checked', false);
            }
            that.strMagnet();
            console.log("已选中 "+that.gatherMagnet().length+" 项");
        });
        // 复制当前
        $('td:nth-child(3) > a.download-arrow.arrow-magnet').click(function (f) {
            f.preventDefault();
            GM_setClipboard(this.getAttribute("href")+"\r\n");
            console.log("已复制 当前 项");
            toast("已复制当前条目链接");
        });
    };

    // 收集磁力链接
    this.gatherMagnet = function () {
        return $('input.magnet:checkbox:checked').map(function () {
            const $tr = $(this).closest('tr');
            let magnet = $tr.find('a.download-arrow.arrow-magnet').attr('href');
            const $titleLink = $tr.find('td.title a');
            const name = $tr.find('td.title a[target="_blank"]').text().trim();
            console.log("正在处理: " + name);

            if (magnet && name) {
                const encodedName = encodeURIComponent(name);
                if (/([?&])dn=[^&]*/.test(magnet)) {
                    magnet = magnet.replace(/([?&])dn=[^&]*/, `$1dn=${encodedName}`);
                } else {
                    const separator = magnet.includes('?') ? '&' : '?';
                    magnet += `${separator}dn=${encodedName}`;
                }
                return magnet;
            }
            return null;
        }).get().filter(Boolean);
    };
    // 格式化磁力链接字符串
    this.strMagnet = function () {
        var str = this.gatherMagnet().join('\r\n');
        $('.download-all').attr('href', str);
        return str;
    };
    // 弹出提示框
    function toast(msg) {
        var toastSpan = document.createElement("span");
        toastSpan.style.top = "45%";
        toastSpan.style.left = "50%";
        toastSpan.style.color = "#fff";
        toastSpan.style.position = "fixed";
        toastSpan.style.borderRadius = "4px";
        toastSpan.style.padding = "8px 16px";
        toastSpan.style.background = "rgba(0,0,0,0.6)";
        toastSpan.style.transform = "translate(-50%, -50%)";
        toastSpan.style.transition = "opacity .3s";
        toastSpan.style.opacity = "1";
        toastSpan.innerText = msg;
        document.body.appendChild(toastSpan);
        setTimeout(function () {
            toastSpan.style.opacity = "0";
            setTimeout(function () {
                toastSpan.remove(toastSpan);
            }, 300);
        }, 1500);
    }

    // 悬浮按钮容器样式
    const style = document.createElement('style');
    style.textContent = `
    #float-btns {
        position: fixed;
        left: 15px;
        top:55%;
        transform: translateY(-50%);
        z-index: 9999;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    .float-btn {
        width: 20px;
        height: 20px;
        border-radius: 40%;
        border: 2px solid #247;
        background: #fff;
        color: #247;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        transition: all 0.3s;
        font-size: 20px;
        position: relative;
    }
    .float-btn:hover {
        transform: scale(1.1);
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
    }
    .tooltip {
        position: absolute;
        left: 40px;
        white-space: nowrap;
        background: #333;
        color: #fff;
        padding: 5px 10px;
        border-radius: 4px;
        opacity: 0;
        transition: opacity 0.3s;
        pointer-events: none;
        font-size: 10px;
    }
    .float-btn:hover .tooltip {
        opacity: 1;
    }
    `;

    // 创建按钮容器
    const btnContainer = document.createElement('div');
    btnContainer.id = 'float-btns';

    // 按钮功能实现
    const buttons = [
        {
            icon: '⇪',
            text: '返回顶部',
            action: () => window.scrollTo({ top: 0, behavior: 'smooth' })
        },
        {
            icon: '↶',
            text: '上一页',
            action: () => {
                if(document.querySelector("body > div.container > div > div.main > div.table.clear > div.nav_title > div.fl > a:nth-child(1)").innerHTML == "上一頁") {
                    window.location.href = document.querySelector("body > div.container > div > div.main > div.table.clear > div.nav_title > div.fl > a:nth-child(1)").href
                }
            }
        },
        {
            icon: '↷',
            text: '下一页',
            action: () => {
                if(document.querySelector("body > div.container > div > div.main > div.table.clear > div.nav_title > div.fl > a:nth-child(2)").innerHTML == "下一頁") {
                    window.location.href = document.querySelector("body > div.container > div > div.main > div.table.clear > div.nav_title > div.fl > a:nth-child(2)").href
                } else {
                    window.location.href = document.querySelector("body > div.container > div > div.main > div.table.clear > div.nav_title > div.fl > a:nth-child(1)").href
                }
            }
        },
        {
            icon: '⎘',
            text: '复制所选',
            action: () => {
                const selected = document.querySelectorAll('.magnet:checked');
                if (selected.length === 0) {
                    toast("未选中任何条目");
                    return;
                }
                // 调用 gatherMagnet 来获取处理过的链接数组
                const links = that.gatherMagnet().join('\n');
                navigator.clipboard.writeText(links);
                toast("已复制　" + selected.length + " 项　选中条目链接");
            }
        },
        {
            icon: '╳',
            text: '清除所选',
            action: () => {
                document.querySelectorAll('.magnet').forEach(checkbox => {
                    checkbox.checked = false;
                });
                document.querySelector('.select-all').checked = false;
                toast("已清除所有选择");
            }
        }
    ];

    // 动态生成按钮
    buttons.forEach(btn => {
        const button = document.createElement('div');
        button.className = 'float-btn';
        button.innerHTML = `${btn.icon}<span class="tooltip">${btn.text}</span>`;
        button.onclick = btn.action;
        btnContainer.appendChild(button);
    });

    // 添加到页面
    document.head.appendChild(style);
    document.body.appendChild(btnContainer);
}
new dmhy().init();