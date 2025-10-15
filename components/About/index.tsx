interface Props {
  content: string
}

export function About({ content }: Props) {

  return (
    <div dangerouslySetInnerHTML={{ __html: content }} />

  )
}


