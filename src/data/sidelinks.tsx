import {
  IconApps,
  IconBarrierBlock,
  IconError404,
  IconExclamationCircle,
  IconLayoutDashboard,
  IconRouteAltLeft,
  IconServerOff,
  IconSettings,
  IconUsers,
  IconLock,
  IconUserScreen,
  IconTractor,
  IconPinned,
  IconPlant2,
  IconBuilding,
  IconScale,
  IconBuildingArch,
  IconMoneybag,
  IconKeyboard,
  IconMessage,
  IconHelpCircle,
  IconReservedLine,
  IconMapCheck,
  IconPhone,
  IconPrinter,
  IconUserCheck,
  IconLocation,
  IconPlant,
  IconCashBanknote
} from '@tabler/icons-react'

export interface NavLink {
  title: string
  label?: string
  href: string
  icon: JSX.Element
}

export interface SideLink extends NavLink {
  sub?: NavLink[]
}

export const sidelinks: SideLink[] = [
  {
    title: 'Dashboard',
    label: '',
    href: '/',
    icon: <IconLayoutDashboard size={18} />,
  },
  {
    title: 'Farmers',
    label: '',
    href: '/farmers',
    icon: <IconTractor size={18} />,
  },
  {
    title: 'Farmers Harvests',
    label: '',
    href: '/farmers-harvests',
    icon: <IconScale size={18} />,
  },
  {
    title: 'Manage Crops',
    label: '',
    href: '/requests',
    icon: <IconPlant2 size={18} />,
    sub: [
      {
        title: 'Crops',
        label: '',
        href: '/crops',
        icon: <IconPlant2 size={18} />,
      },
      {
        title: 'Crop Type',
        label: '',
        href: '/crop-types',
        icon: <IconPlant2 size={18} />,
      },
      {
        title: 'Crop Prices',
        label: '',
        href: '/cargos',
        icon: <IconScale size={18} />,
      },
      {
        title: 'Measurement units',
        label: '',
        href: '/measurement-units',
        icon: <IconScale size={18} />,
      },
    ],
  },
  {
    title: 'Manage Users',
    label: '',
    href: '/users',
    icon: <IconUsers size={18} />,
  },
  {
    title: 'Manage Amcos',
    label: '',
    href: '/requests',
    icon: <IconRouteAltLeft size={18} />,
    sub: [
      {
        title: 'Mcu',
        label: '',
        href: '/mcus',
        icon: <IconBuildingArch size={18} />,
      },
      {
        title: 'Amcos',
        label: '',
        href: '/amcos',
        icon: <IconBuildingArch size={18} />,
      },
      {
        title: 'Collection Center',
        label: '',
        href: '/collection-center',
        icon: <IconBuilding size={18} />,
      },
    ],
  },
  {
    title: 'Other Modules',
    label: '',
    href: '/requests',
    icon: <IconApps size={18} />,
    sub: [
      {
        title: 'Training Module',
        label: '',
        href: '/modules/training',
        icon: <IconUserScreen size={18} />,
      },
      {
        title: 'Survey Module',
        label: '',
        href: '/extra-components',
        icon: <IconReservedLine size={18} />,
      },
      {
        title: 'Mapping Module',
        label: '',
        href: '/extra-components',
        icon: <IconMapCheck size={18} />,
      },
      {
        title: 'Farm Mapping Module',
        label: '',
        href: '/extra-components',
        icon: <IconMapCheck size={18} />,
      },
      {
        title: 'ID printing Module',
        label: '',
        href: '/extra-components',
        icon: <IconPrinter size={18} />,
      },
      {
        title: 'Input Suppliers Module',
        label: '',
        href: '/extra-components',
        icon: <IconUserCheck size={18} />,
      },
      {
        title: 'Agro dealers Module',
        label: '',
        href: '/extra-components',
        icon: <IconUserScreen size={18} />,
      },
      {
        title: 'Insurers Module',
        label: '',
        href: '/extra-components',
        icon: <IconHelpCircle size={18} />,
      },
      {
        title: 'Bankers Module',
        label: '',
        href: '/extra-components',
        icon: <IconCashBanknote size={18} />,
      },
      {
        title: 'Buyers Module',
        label: '',
        href: '/extra-components',
        icon: <IconUserCheck size={18} />,
      },
      {
        title: 'SMS Module',
        label: '',
        href: '/modules/sms-module',
        icon: <IconMessage size={18} />,
      },
      {
        title: 'USSD Module',
        label: '',
        href: '/extra-components',
        icon: <IconKeyboard size={18} />,
      },
      {
        title: 'Contact Farming Module',
        label: '',
        href: '/extra-components',
        icon: <IconPhone size={18} />,
      },
      {
        title: 'Agricultural Inputs',
        label: '',
        href: '/agriculturla-inputs',
        icon: <IconTractor size={18} />,
      },
      {
        title: 'Online Auction Platform',
        label: '',
        href: '/agricultural-inputs',
        icon: <IconLocation size={18} />,
      },
      {
        title: 'Harvest Collection Module',
        label: '',
        href: '/agricultural-inputs',
        icon: <IconPlant size={18} />,
      },
      {
        title: 'Weightbridge Module',
        label: '',
        href: '/agricultural-inputs',
        icon: <IconScale size={18} />,
      },
      {
        title: 'PESATag Module',
        label: '',
        href: '/agricultural-inputs',
        icon: <IconMoneybag size={18} />,
      },
    ],
  },


  //Admin Modules
  {
    title: 'Locations',
    label: '',
    href: '/requests',
    icon: <IconRouteAltLeft size={18} />,
    sub: [
      {
        title: 'Region',
        label: '',
        href: '/regions',
        icon: <IconPinned size={18} />,
      },
      {
        title: 'District',
        label: '',
        href: '/districts',
        icon: <IconPinned size={18} />,
      },
      {
        title: 'Wards',
        label: '',
        href: '/wards',
        icon: <IconPinned size={18} />,
      },
      {
        title: 'Villages',
        label: '',
        href: '/villages',
        icon: <IconPinned size={18} />,
      },
    ],
  },

  {
    title: 'Error Pages',
    label: '',
    href: '',
    icon: <IconExclamationCircle size={18} />,
    sub: [
      {
        title: 'Not Found',
        label: '',
        href: '/404',
        icon: <IconError404 size={18} />,
      },
      {
        title: 'Internal Server Error',
        label: '',
        href: '/500',
        icon: <IconServerOff size={18} />,
      },
      {
        title: 'Maintenance Error',
        label: '',
        href: '/503',
        icon: <IconBarrierBlock size={18} />,
      },
      {
        title: 'Unauthorised Error',
        label: '',
        href: '/401',
        icon: <IconLock size={18} />,
      },
    ],
  },
  {
    title: 'Apps',
    label: '',
    href: '/apps',
    icon: <IconApps size={18} />,
  },
  {
    title: 'Settings',
    label: '',
    href: '/settings',
    icon: <IconSettings size={18} />,
  },
  // {
  //   title: 'Authentication',
  //   label: '',
  //   href: '',
  //   icon: <IconUserShield size={18} />,
  //   sub: [
  //     {
  //       title: 'Sign In (email + password)',
  //       label: '',
  //       href: '/sign-in',
  //       icon: <IconHexagonNumber1 size={18} />,
  //     },
  //     {
  //       title: 'Sign In (Box)',
  //       label: '',
  //       href: '/sign-in-2',
  //       icon: <IconHexagonNumber2 size={18} />,
  //     },
  //     {
  //       title: 'Sign Up',
  //       label: '',
  //       href: '/sign-up',
  //       icon: <IconHexagonNumber3 size={18} />,
  //     },
  //     {
  //       title: 'Forgot Password',
  //       label: '',
  //       href: '/forgot-password',
  //       icon: <IconHexagonNumber4 size={18} />,
  //     },
  //     {
  //       title: 'OTP',
  //       label: '',
  //       href: '/otp',
  //       icon: <IconHexagonNumber5 size={18} />,
  //     },
  //   ],
  // },
]
