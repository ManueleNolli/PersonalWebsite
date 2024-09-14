/* eslint-disable */
// ! This is needed for nextjs to correctly resolve

process.chdir(__dirname)
process.env.NODE_ENV = 'production'

console.log('1')
const { default: NextServer } = require('next/dist/server/next-server')
console.log('2')
const serverless = require('serverless-http')
console.log('3')
const { ServerResponse } = require('http')
console.log('4')
const path = require('path')
console.log('5')

// This will be loaded from custom config parsed via CLI.
const nextConf = {
  env: {},
  webpack: null,
  eslint: { ignoreDuringBuilds: false },
  typescript: { ignoreBuildErrors: false, tsconfigPath: 'tsconfig.json' },
  distDir: './.next',
  cleanDistDir: true,
  assetPrefix: '',
  cacheMaxMemorySize: 0,
  configOrigin: 'next.config.mjs',
  useFileSystemPublicRoutes: true,
  generateEtags: false,
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  poweredByHeader: true,
  compress: true,
  analyticsId: '',
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    path: '/_next/image',
    loader: 'default',
    loaderFile: '',
    domains: [],
    disableStaticImages: false,
    minimumCacheTTL: 0,
    formats: ['image/webp'],
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "script-src 'none'; frame-src 'none'; sandbox;",
    contentDispositionType: 'inline',
    remotePatterns: [],
    unoptimized: false,
  },
  devIndicators: { buildActivity: true, buildActivityPosition: 'bottom-right' },
  onDemandEntries: { maxInactiveAge: 60000, pagesBufferLength: 5 },
  amp: { canonicalBase: '' },
  basePath: '',
  sassOptions: {},
  trailingSlash: false,
  i18n: null,
  productionBrowserSourceMaps: false,
  optimizeFonts: true,
  excludeDefaultMomentLocales: true,
  serverRuntimeConfig: {},
  publicRuntimeConfig: {},
  reactProductionProfiling: false,
  reactStrictMode: false,
  httpAgentOptions: { keepAlive: true },
  outputFileTracing: true,
  staticPageGenerationTimeout: 60,
  swcMinify: true,
  output: 'standalone',
  modularizeImports: { '@mui/icons-material': { transform: '@mui/icons-material/{{member}}' }, lodash: { transform: 'lodash/{{member}}' } },
  experimental: {
    prerenderEarlyExit: false,
    serverMinification: true,
    serverSourceMaps: false,
    linkNoTouchStart: false,
    caseSensitiveRoutes: false,
    clientRouterFilter: true,
    clientRouterFilterRedirects: false,
    fetchCacheKeyPrefix: '',
    middlewarePrefetch: 'flexible',
    optimisticClientCache: false,
    manualClientBasePath: false,
    cpus: 7,
    memoryBasedWorkersCount: false,
    isrFlushToDisk: true,
    workerThreads: false,
    optimizeCss: false,
    nextScriptWorkers: false,
    scrollRestoration: false,
    externalDir: false,
    disableOptimizedLoading: false,
    gzipSize: true,
    craCompat: false,
    esmExternals: true,
    fullySpecified: false,
    outputFileTracingRoot: '/home/manuele-nolli/git/personal/ManueleNolli',
    swcTraceProfiling: false,
    forceSwcTransforms: false,
    largePageDataBytes: 128000,
    adjustFontFallbacks: false,
    adjustFontFallbacksWithSizeAdjust: false,
    typedRoutes: false,
    instrumentationHook: false,
    bundlePagesExternals: false,
    parallelServerCompiles: false,
    parallelServerBuildTraces: false,
    ppr: false,
    missingSuspenseWithCSRBailout: true,
    optimizeServerReact: true,
    useEarlyImport: false,
    staleTimes: { dynamic: 30, static: 300 },
    optimizePackageImports: [
      'lucide-react',
      'date-fns',
      'lodash-es',
      'ramda',
      'antd',
      'react-bootstrap',
      'ahooks',
      '@ant-design/icons',
      '@headlessui/react',
      '@headlessui-float/react',
      '@heroicons/react/20/solid',
      '@heroicons/react/24/solid',
      '@heroicons/react/24/outline',
      '@visx/visx',
      '@tremor/react',
      'rxjs',
      '@mui/material',
      '@mui/icons-material',
      'recharts',
      'react-use',
      '@material-ui/core',
      '@material-ui/icons',
      '@tabler/icons-react',
      'mui-core',
      'react-icons/ai',
      'react-icons/bi',
      'react-icons/bs',
      'react-icons/cg',
      'react-icons/ci',
      'react-icons/di',
      'react-icons/fa',
      'react-icons/fa6',
      'react-icons/fc',
      'react-icons/fi',
      'react-icons/gi',
      'react-icons/go',
      'react-icons/gr',
      'react-icons/hi',
      'react-icons/hi2',
      'react-icons/im',
      'react-icons/io',
      'react-icons/io5',
      'react-icons/lia',
      'react-icons/lib',
      'react-icons/lu',
      'react-icons/md',
      'react-icons/pi',
      'react-icons/ri',
      'react-icons/rx',
      'react-icons/si',
      'react-icons/sl',
      'react-icons/tb',
      'react-icons/tfi',
      'react-icons/ti',
      'react-icons/vsc',
      'react-icons/wi',
    ],
    trustHostHeader: false,
    isExperimentalCompile: false,
  },
  configFileName: 'next.config.mjs',
}

const config = {
  hostname: 'localhost',
  port: Number(process.env.PORT) || 3000,
  dir: path.join(__dirname),
  dev: false,
  customServer: false,
  conf: nextConf,
  cacheMaxMemorySize: 0,
  generateEtags: false,
}

const nextHandler = new NextServer(config).getRequestHandler()

exports.handler = serverless(
  async (req, res) => {
    try {
      console.log('serverless handler')
      console.log('Request:', req)
      await nextHandler(req, res) // it will automatically respond
      console.log('Response:', res)
    } catch (error) {
      console.error('Error handling request:', error)
      res.statusCode = 500
      res.end('Internal Server Error')
    }
  },
  {
    binary: ['*/*'],
    provider: 'aws',
    basePath: '/_server',
    request: (request) => {
      console.log('Original Request Body:', request.body)
      delete request.body
      console.log('Modified Request:', request)
    },
  }
)
