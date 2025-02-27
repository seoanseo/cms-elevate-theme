type TagComponentProps = {
  children?: React.ReactNode;
};

export function TagComponent(props: TagComponentProps) {
  const { children = 'default' } = props;

  return <span className='hs-elevate-tag'>{children}</span>;
}
