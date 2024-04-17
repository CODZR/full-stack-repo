export const nav = [ // menu
  {
    title: 'Blog',
    // activeMatch: `^/(product)/`,
    columnSubmenu: [
      {
        title: '随便看看',
        items: [ // TODO: column_submenu
          { text: '导览', link: '/blog/guide/' },
          { text: '舌诊', link: '/blog/diagnosis/tongue' },
          { text: '经络穴位图', link: '/blog/diagnosis/pulse-figure' },
        ]
      },
      {
        title: '饮食',
        items: [
          { text: '食疗', link: '/blog/food/' },
          { text: '四季水果', link: '/blog/food/four-seasons' },
          { text: '24节气饮食', link: '/blog/food/24solar-terms' },
        ]
      },
      {
        title: '杂',
        items: [
          { text: '天气预报', link: '/blog/guide/weather' },
        ]
      }
    ]
  },
  {
    title: 'Hanzi',
    // activeMatch: `^/(product)/`,
    columnSubmenu: [
      {
        title: '文章',
        items: [ 
          { text: '千字文', link: 'https://dzrlab.top/article/qianziwen' },
        ]
      },
    ]
  },
  {
    title: 'UI',
    submenu: [
      { text: '滚动效果', link: '/ui/scroll' },
    ]
  },
  {
    title: 'Technology',
    submenu: [
      { text: '学习链接', link: '/blog/technology/links' },
      { text: '快捷键', link: '/blog/technology/shortcuts' },
      { text: '命令行', link: '/blog/technology/command' },
    ]
  },
  {
    title: 'Contact',
    link: '/contact/',
  }
]
