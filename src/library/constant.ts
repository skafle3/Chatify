export const DEFAULT_AVATAR =
  'https://woodfibreinsulation.co.uk/wp-content/uploads/2017/04/blank-profile-picture-973460.png'

export const FILE_ICON = (extension: string) =>
  `https://cdn.jsdelivr.net/gh/napthedev/file-icons/file/${extension}.svg`

export const IMAGE_PROXY = (url: string) =>
  `https://apoqrsgtqq.cloudimg.io/${url}`

export const REACTIONS_UI: {
  [key: string]: {
    icon: string
    gif: string
  }
} = {
  Like: {
    icon: 'https://raw.githubusercontent.com/napthedev/fireverse/c1233e40a2c52b21690ee6dbaadeda7185a76b5f/public/reactions-icon/like.svg',
    gif: 'https://raw.githubusercontent.com/napthedev/fireverse/master/public/reactions/like.gif',
  },
  Love: {
    icon: 'https://raw.githubusercontent.com/napthedev/fireverse/c1233e40a2c52b21690ee6dbaadeda7185a76b5f/public/reactions-icon/love.svg',
    gif: 'https://raw.githubusercontent.com/napthedev/fireverse/master/public/reactions/love.gif',
  },
  Care: {
    icon: 'https://raw.githubusercontent.com/napthedev/fireverse/c1233e40a2c52b21690ee6dbaadeda7185a76b5f/public/reactions-icon/care.svg',
    gif: 'https://raw.githubusercontent.com/napthedev/fireverse/master/public/reactions/care.gif',
  },
  Haha: {
    icon: 'https://raw.githubusercontent.com/napthedev/fireverse/c1233e40a2c52b21690ee6dbaadeda7185a76b5f/public/reactions-icon/haha.svg',
    gif: 'https://raw.githubusercontent.com/napthedev/fireverse/master/public/reactions/haha.gif',
  },
  Wow: {
    icon: 'https://raw.githubusercontent.com/napthedev/fireverse/c1233e40a2c52b21690ee6dbaadeda7185a76b5f/public/reactions-icon/wow.svg',
    gif: 'https://raw.githubusercontent.com/napthedev/fireverse/master/public/reactions/wow.gif',
  },
  Sad: {
    icon: 'https://raw.githubusercontent.com/napthedev/fireverse/c1233e40a2c52b21690ee6dbaadeda7185a76b5f/public/reactions-icon/sad.svg',
    gif: 'https://raw.githubusercontent.com/napthedev/fireverse/master/public/reactions/sad.gif',
  },
  Angry: {
    icon: 'https://raw.githubusercontent.com/napthedev/fireverse/c1233e40a2c52b21690ee6dbaadeda7185a76b5f/public/reactions-icon/angry.svg',
    gif: 'https://raw.githubusercontent.com/napthedev/fireverse/master/public/reactions/angry.gif',
  },
}
