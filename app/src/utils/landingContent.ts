import { ImageProps } from '@chakra-ui/react';

interface ITextSide {
  title: string;
  description: string[];
}

interface IImageSide extends ImageProps {
  title?: string;
}

export interface ISection1 {
  textSide: ITextSide;
  imageSide: IImageSide;
}

export const SECTION1: ISection1[] = [
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
    },
  },
];
