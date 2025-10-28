import { useRouter } from 'next/router'
import { useEffect } from 'react'

interface Props {
  content: string
}
export function Faq({ content }: Props) {
  const router = useRouter()

  useEffect(() => {
    if (!content) {
      return
    }

    const summaries = document.querySelectorAll<HTMLDivElement>('.faq_accordion-summary');
    const allDetails = document.querySelectorAll<HTMLDivElement>('.faq_accordion_details');

    const closeAllItems = () => {
      summaries.forEach(s => s.classList.remove('is-expanded'));
      allDetails.forEach(d => d.classList.remove('is-expanded'));
    };

    const handlers: Array<() => void> = []

    summaries.forEach((summary) => {
      const handler = () => {
        const item = summary.closest('.faq_accordion-item')
        const details = item?.querySelector<HTMLElement>('.faq_accordion_details')

        const isCurrentlyExpanded = summary.classList.contains('is-expanded');

        closeAllItems();

        if (!isCurrentlyExpanded) {
          summary.classList.toggle('is-expanded')
          details?.classList.toggle('is-expanded')
        }

      }

      summary.addEventListener('click', handler)
      handlers.push(() => summary.removeEventListener('click', handler))
    })

    return () => {
      handlers.forEach((remove) => remove());
    }
  }, [content, router])
  return (
    <div dangerouslySetInnerHTML={{ __html: content }} />
  )
}