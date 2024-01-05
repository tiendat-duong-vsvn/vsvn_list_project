let LIST_PROJECT = [
    {
        id: 1,
        type: 'Project',
        project_code: 'P001',
        project_name: 'Verigen:Chat',
        project_link: 'https://verigenchat-stg.az.veriserve-vietnam.com/chat',
    },
    {
        id: 2,
        type: 'Project',
        project_code: 'P002',
        project_name: 'Revenue Management',
        project_link: 'https://google.com',
    },
    {
        id: 3,
        type: 'Group',
        group_id: 'G01',
        group_name: 'Labs',
        expand: false,
        projects: [
            {
                project_code: 'P003',
                project_name: 'Entach',
                project_link: 'https://google.com',
            },
            {
                project_code: 'P004',
                project_name: 'ImageCompare',
                project_link: 'https://google.com',
            },
            {
                project_code: 'P005',
                project_name: 'MemberSkill',
                project_link: 'https://google.com',
            },
            {
                project_code: 'P006',
                project_name: 'DocVerification',
                project_link: 'https://verigenchat-stg.az.veriserve-vietnam.com/chat',
            },
            {
                project_code: 'P007',
                project_name: 'TicketBug',
                project_link: 'https://google.com',
            },
            {
                project_code: 'P008',
                project_name: 'RAG',
                project_link: 'https://google.com',
            },
        ]
    },
    {
        id: 4,
        type: 'Group',
        group_id: 'G02',
        group_name: 'Tech',
        expand: true,
        projects: [
            {
                project_code: 'P003',
                project_name: 'Entach',
                project_link: 'https://google.com',
            },
            {
                project_code: 'P004',
                project_name: 'ImageCompare',
                project_link: 'https://google.com',
            },
        ]
    }
];

let actionBarIconSVG = `
    <svg width="16px" height="16px" viewBox="0 0 1024 1024" class="icon" xmlns="http://www.w3.org/2000/svg" fill="#484f57">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
            <path fill="#484f57" d="M128 192h768v128H128V192zm0 256h512v128H128V448zm0 256h768v128H128V704zm576-352l192 160-192 128V352z"></path>
        </g>
    </svg>
`;

let collapseIconSVG = `
    <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
            <path d="M5.70711 9.71069C5.31658 10.1012 5.31658 10.7344 5.70711 11.1249L10.5993 16.0123C11.3805 16.7927 12.6463 16.7924 13.4271 16.0117L18.3174 11.1213C18.708 10.7308 18.708 10.0976 18.3174 9.70708C17.9269 9.31655 17.2937 9.31655 16.9032 9.70708L12.7176 13.8927C12.3271 14.2833 11.6939 14.2832 11.3034 13.8927L7.12132 9.71069C6.7308 9.32016 6.09763 9.32016 5.70711 9.71069Z" fill="#484f57"></path>
        </g>
    </svg>
`;

let cssStyle = `
    #list_project_vsvn {
        cursor: pointer;
        position: absolute;
        top: 0px;
        padding: 5px 0px;
        .list_project_action_bar {
            display: flex;
            align-items: center;
            .action_bar__icon {
                display: flex;
            }
            .action_bar__text {
                margin-left: 5px;
            }
        }
        .list_project__select {
            width: 15rem;
            margin: 5px 10px;
            border: 1px solid #d1d5db;
            border-radius: 5px;
            position: absolute;
            background-color: #fff;
            .list_project__item {
                padding: 10px 15px;
                border-bottom: 1px solid #d1d5db;
                a {
                    color: #000;
                }
                a:link {
                    text-decoration: none;
                }
            }
            .list_project__item:hover {
                background-color: #3b82f6;
            }
            .list_project__group {
                .list_project__group_name {
                    display: flex;
                    padding: 10px 15px;
                    border-bottom: 1px solid #d1d5db;

                    .list_project__group_name_text {
                        width: 13rem;
                    }
                }
                .list_project__group_name:hover {
                    background-color: #3b82f6;
                }
                .list_project__group_name_icon.rotate_icon {
                    rotate: 180deg;
                }
                .list_project__group_children {
                    padding: 0px 10px 10px;
                    .list_project__group_item {
                        background-color: #edeeef;
                        border-bottom: 1px solid #d1d5db;
                        padding: 10px 40px;
                        a {
                            color: #000;
                        }
                        a:link {
                            text-decoration: none;
                        }
                    }
                    .list_project__group_item:hover {
                        background-color: #3b82f6;
                    }
                }
                .list_project__group_children.hide_children {
                    display: none;
                }
            }
        }
    }
`;

let isOpenListProject = false;

function createListProjectNavBar() {
    // outside element
    var outSideElement = document.createElement('div');
    outSideElement.id = 'list_project_vsvn';

    let contentSelect = '';
    LIST_PROJECT.forEach(item => {
        let itemHTML = '';
        if (item.type === 'Project') {
            itemHTML = `
                <div class="list_project__item">
                    <a href="${item.project_link}" target="_blank">${item.project_name}</a>
                </div>
            `; 
        } else if (item.type === 'Group') {
            let classGroupProject = "list_project__group_children" + (item.expand ? '' : ' hide_children');
            let classIconExpand = "list_project__group_name_icon" + (item.expand ? ' rotate_icon' : '');
            itemHTML = `
                <div class="list_project__group" data-group-id="${item.group_id}">
                    <div class="list_project__group_name" data-group-id="${item.group_id}">
                        <div class="list_project__group_name_text">${item.group_name}</div>
                        <div class="${classIconExpand}">
                            ${collapseIconSVG}
                        </div>
                    </div>
                    <div class="${classGroupProject}">
            `;
            item.projects.forEach(children => {
                itemHTML += `
                    <div class="list_project__group_item">
                        <a href="${children.project_link}" target="_blank">${children.project_name}</a>
                    </div>
                `;
            });
            itemHTML += `
                    </div>
                </div>
            `;
        }
        contentSelect += itemHTML;
    });

    outSideElement.innerHTML = `
        <div class="list_project_action_bar">
            <div class="action_bar__icon">
                ${actionBarIconSVG}
            </div>
            <div class="action_bar__text">List project VSVN</div>
        </div>
        <div class="list_project__select">
            ${contentSelect}
        </div>
    `;

    // Hide list project select
    let listProjectSelect = outSideElement.querySelector('.list_project__select');
    listProjectSelect.style.display = 'none';

    // Add css style
    var styleElement = document.createElement('style');
    styleElement.innerHTML = cssStyle;

    // Add event
    // Open collapse select list
    let actionBarElement = outSideElement.querySelector('.list_project_action_bar');
    actionBarElement.addEventListener('click', () => {
        isOpenListProject = !isOpenListProject;
        listProjectSelect.style.display = isOpenListProject ? 'block' : 'none';
    });
    
    // Open group project item
    let groupProjectItem = outSideElement.querySelectorAll('.list_project__group_name');
    groupProjectItem.forEach(element => {
        element.addEventListener('click', () => {
            let parentElement = element.parentElement;
            let groupClicked = LIST_PROJECT.find(item => item.group_id === element.dataset.groupId);
            groupClicked.expand = !groupClicked.expand;
            let groupChildren = parentElement.querySelector('.list_project__group_children');
            let iconExpand = parentElement.querySelector('.list_project__group_name_icon');
            if (groupClicked.expand) {
                groupChildren.classList.remove('hide_children');
                iconExpand.classList.add('rotate_icon');
            } else {
                groupChildren.classList.add('hide_children');
                iconExpand.classList.remove('rotate_icon');
            }
        });
    });

    // Click item project to redirect
    let projectItems = outSideElement.querySelectorAll('.list_project__item, .list_project__group_item');
    projectItems.forEach(element => {
        element.addEventListener('click', () => {
            let projectLink = element.querySelector('a').href;
            window.location.href = projectLink;
        });
    });

    // Click outside to close list project
    let classListProjectList = [
        'action_bar__text',
        'list_project__item',
        'list_project__group_name_text',
        'list_project__group_item'
    ];
    document.addEventListener('click', event => {
        if (isOpenListProject && !classListProjectList.includes(event.target.className) && !['svg', 'path'].includes(event.target.tagName)) {
            isOpenListProject = !isOpenListProject;
            listProjectSelect.style.display = 'none';
        }
    });

    // Append to HTML
    var firstChild = document.body.firstChild;
    if (firstChild && firstChild.parentNode === document.body) {
        document.body.insertBefore(outSideElement, firstChild);
        document.body.insertBefore(styleElement, firstChild);
    } else {
        document.body.appendChild(outSideElement);
        document.body.appendChild(styleElement);
    }
}

function init() {
    createListProjectNavBar();
}
console.log('INIT LIST PROJECT');
init();
