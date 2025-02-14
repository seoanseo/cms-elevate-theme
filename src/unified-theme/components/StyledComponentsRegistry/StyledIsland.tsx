import { Island } from '@hubspot/cms-components';
import StyledComponentsRegistry from './StyledComponentsRegistry.jsx?client';

export default function StyledIsland(props) {
  return <Island {...props} Wrapper={StyledComponentsRegistry} />;
}
