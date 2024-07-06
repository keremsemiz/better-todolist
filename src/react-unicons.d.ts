declare module '@iconscout/react-unicons' {
    import * as React from 'react';
  
    export interface UniconProps {
      color?: string;
      size?: string | number;
      stroke?: string | number;
      [key: string]: any;
    }
  
    export const UilSearch: React.FC<UniconProps>;
    export const UilStar: React.FC<UniconProps>;
    export const UilHeart: React.FC<UniconProps>;
    export const UilUser: React.FC<UniconProps>;
    // Add other icons as needed
  }
  