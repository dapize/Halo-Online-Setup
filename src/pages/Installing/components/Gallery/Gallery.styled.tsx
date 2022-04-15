import styled from "@emotion/styled";
import { IImage } from './Gallery.d';

export const Image = styled.img<IImage>`
  display: block;
  width: 100%;
  height: 100%;
  z-index: ${ props => props.active ? 10 : 5 };
  position: absolute;
  top: 0;
  left: 0;
  transition: opacity 0.5s ease-in-out;
  opacity: ${ props => props.active ? 1 : 0 };
`
