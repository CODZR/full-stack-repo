export const nav = [ // menu
  {
    title: 'Blog',
    // activeMatch: `^/(product)/`,
    columnSubmenu: [
      {
        title: '养生',
        items: [ // TODO: column_submenu
          { text: '导览', link: '/blog/guide/' },
          { text: '舌诊', link: '/blog/diagnosis/tongue' },
          { text: '脉诊', link: '/blog/diagnosis/pulse' },
          { text: '经络穴位图', link: '/blog/diagnosis/pulse-figure' },
        ]
      },
      {
        title: '饮食',
        items: [
          { text: '食疗', link: '/blog/food/' },
          { text: '四季水果', link: '/blog/food/four-seasons' },
          { text: '24节气饮食', link: '/blog/food/24solar-terms' },
          { text: '搜索单一食物', link: '/blog/search/material' },
          { text: '搜索复合食物', link: '/blog/search/combination' },
        ]
      },
      {
        title: '杂',
        items: [
          { text: '天气预报', link: '/blog/guide/weather' },
          { text: '生活习惯', link: '/blog/guide/life' },
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
          { text: '千字文', link: '/hanzi/article/Qianziwen' },
        ]
      },
    ]
  },
  {
    title: 'Woman',
    // activeMatch: `^/(product)/`,
    columnSubmenu: [
      {
        title: '怀孕',
        items: [ // TODO: column_submenu
          { text: '常见症状', link: '/blog/woman/pregnant/symptom' },
          { text: '工作', link: '/blog/woman/pregnant/work' },
          { text: '食谱', link: '/blog/woman/pregnant/food' },
          { text: '小建议', link: '/blog/woman/pregnant/tips' },
        ]
      },
      {
        title: '姨妈',
        items: [ // TODO: column_submenu
          { text: '注意事项', link: '/blog/woman/menstruation/tips' },
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
