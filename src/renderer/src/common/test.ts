export function useLoadingMessageGenerator() {
  let progress = 0
  let lastMessage = ''

  const loadingMessages = [
    '正在扫描文件',
    '删除临时文件',
    '正在获取用户数据',
    '加载配置信息',
    '正在验证权限',
    '处理请求中',
    '正在连接服务器',
    '更新数据库记录',
    '正在下载更新包',
    '解析数据内容',
    '正在初始化系统',
    '准备就绪',
    '正在计算哈希值',
    '同步云端数据',
    '正在压缩文件',
    '检查网络连接',
    '正在渲染界面',
    '保存用户设置',
    '正在备份数据',
    '验证文件完整性',
    '正在安装组件',
    '清理缓存数据',
    '正在启动服务',
    '加载资源文件',
    '正在分析日志',
    '优化性能',
    '正在刷新列表',
    '生成报告文件',
    '正在搜索内容',
    '上传文件中',
    '正在准备下载',
    '解码媒体流',
    '正在索引文件',
    '验证用户身份',
    '正在排队任务',
    '准备打印',
    '正在转换格式',
    '计算存储空间',
    '正在重启服务',
    '加载字体资源'
  ]

  return {
    inc: function () {
      // 随机决定是否重复上一条消息 (约20%的概率重复)
      const shouldRepeat = Math.random() < 0.2 && lastMessage !== ''

      const message = shouldRepeat
        ? lastMessage
        : loadingMessages[Math.floor(Math.random() * loadingMessages.length)]
      lastMessage = message

      // 生成递增幅度：0 或 0.01-0.05 之间的随机值
      const increment = Math.random() < 0.3 ? 0 : Math.random() * 0.04 + 0.01
      progress = Math.min(1, progress + increment)

      return {
        message: message,
        progress: parseFloat(progress.toFixed(2)) // 保留2位小数
      }
    },
    reset: () => (progress = 0)
  }
}
