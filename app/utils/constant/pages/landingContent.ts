import type { ImageProps } from '@chakra-ui/react';

type TextSide = {
  title: string;
  description: string[];
};

type ImageSide = ImageProps & {
  title?: string;
};

type Section1 = {
  textSide: TextSide;
  imageSide: ImageSide;
};

type Section2 = TextSide & {
  imagePath: string;
};

export const SECTION1: Section1[] = [
  {
    textSide: {
      title: 'Welcome to Augmented Reality on Web!',
      description: [
        'Ever think to use an augmented reality on web?',
        "But don't know how to do it?",
        'This is the place for you!',
        'By uploading an image (marker) and a 3D model, you can have an augmented reality on web!',
        'Scroll down to see the features of this project!',
      ],
    },
    imageSide: {
      src: 'images/augmented-reality.jpg',
      alt: 'Augmented Reality Illustration',
      width: '500px',
      userSelect: 'none',
    },
  },
  {
    textSide: {
      title: 'Why on websites?',
      description: [
        'Websites are the most popular way to share information.',
        'By using website, people can connect to each other without any boundaries.',
        'This is why using an AR in website is a must!',
        'People could use AR anywhere-anytime as long they have an internet connections and the marker.',
        'Just imagine, people around the world use your AR easily without any need to install an application to their devices!.',
        'Come and join us and see how easy it is to use AR on websites!',
      ],
    },
    imageSide: {
      src: 'images/presentation.jpg',
      alt: 'Augmented Reality Illustration',
      width: '500px',
      userSelect: 'none',
    },
  },
];

export const SECTION2: Section2[] = [
  {
    title: 'Upload and Done!',
    description: [
      'You only need to upload the marker and the 3D model to start using AR on web!',
      'By uploading the marker and the 3D model, you can make everyone around the world use your AR!',
      "If you doesn't want your marker to be public, you can upload it as hidden.",
      'By making it hidden, only people who knew the link can access your AR.',
    ],
    imagePath: '/images/landing/cards/upload.jpg',
  },
  {
    title: 'Share your creations!',
    description: [
      'You can share your AR creations with your friends and family!',
      'By sharing it, anyone with the link can see your 3D model creations using AR!',
      'Think of it as a social media but for AR!',
    ],
    imagePath: '/images/landing/cards/share.jpg',
  },
  {
    title: 'Go wild and have fun!',
    description: [
      'You can have fun with your creations!',
      'You can make your creations even more fun by adding some animations!',
      'You can even interact with other people creations and giving them a feedback!',
    ],
    imagePath: '/images/landing/cards/fun.jpg',
  },
  {
    title: 'Just another social media!',
    description: [
      'If you tired of the current social media, you can use AR on web!',
      'The purpose of AR on web is to make people around the world use AR!',
      "'Cause AR will make process of sharing your idea a lot easier!",
      'People can easliy know what are you doing and what is your goal!',
    ],
    imagePath: '/images/landing/cards/social.jpg',
  },
];
