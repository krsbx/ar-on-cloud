type Section = {
  title: string;
  description: string[];
  imagePath: string;
};

export const VIEWER_SECTION: Section[] = [
  {
    title: 'Open the AR page',
    description: [
      'The page will contains 2 tabs that you can choose.',
      'Those 2 tabs will be the one that you will chose to determine which one is marker and which one is the AR camera.',
    ],
    imagePath: '/images/landing/cards/share.jpg',
  },
  {
    title: 'Get the marker',
    description: [
      'Choose the `first` tab to get the marker that you can use to show the AR Model.',
      'This marker will be the one that you will use to show AR Model that hidden inside that marker.',
    ],
    imagePath: '/images/landing/cards/upload.jpg',
  },
  {
    title: 'Open the AR page',
    description: [
      "In your other devices, choose the 'second' tab to use the AR Camera in your device.",
      'Your other device will act as your `gate`, the one that help you to see the things inside those marker that you have.',
    ],
    imagePath: '/images/landing/cards/social.jpg',
  },
  {
    title: 'See the magic of AR in your device!',
    description: [
      'Point out your device camera to the marker that you get previously.',
      'Just show the marker to your camera and it will show you what is the things that hidden inside those `marker`.',
    ],
    imagePath: '/images/augmented-reality.jpg',
  },
];

export const CREATOR_SECTION: Section[] = [
  {
    title: 'Open the dashboard page',
    description: [
      'From you device, sign in as user that you register in our website.',
      'After you sign in, open the dashboard page and get ready for the magic that you will made.',
    ],
    imagePath: '/images/landing/cards/upload.jpg',
  },
  {
    title: 'Upload the marker and model',
    description: [
      'Open the `New AR` menu in your dashboard page and wait till it load properly.',
      'After the page loaded, upload the `marker` and the `model` that you want to use for your AR.`',
    ],
    imagePath: '/images/presentation.jpg',
  },
  {
    title: 'Adjust the parameter for your AR',
    description: [
      'There are several parameter that you can tweak to make the AR is just for `you` and the people you want to share too.',
      'Change those parameter as you like and see which tweaks do you prefer.',
    ],
    imagePath: '/images/landing/cards/share.jpg',
  },
  {
    title: 'See the magic of AR in your device!',
    description: [
      'After adjusting the parameter, open the URL that you get to try out the AR that you made.',
      "Don't forget to share it to your friends to show them what kind of magic that you can do.",
    ],
    imagePath: '/images/augmented-reality.jpg',
  },
];
