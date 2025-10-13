import { useCartQuery } from '@graphcommerce/magento-cart'
import { CartPageDocument } from '@graphcommerce/magento-cart-checkout'
import {
  RemoveItemFromCartDocument,
  RemoveItemFromCartMutation,
  RemoveItemFromCartMutationVariables,
} from '@graphcommerce/magento-cart-items'
import { useMutation } from '@apollo/client'
import { useState } from 'react'

export const useClearCart = () => {
  const cartQuery = useCartQuery(CartPageDocument, {
    errorPolicy: 'all',
    fetchPolicy: 'cache-and-network',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<any>(null)

  const [removeItem] = useMutation<RemoveItemFromCartMutation, RemoveItemFromCartMutationVariables>(
    RemoveItemFromCartDocument,
  )
  const handleClearCart = async () => {
    const items = cartQuery.data?.cart?.items || []
    const cartId = cartQuery.data?.cart?.id
    if (!cartId || items.length === 0) return
    const nonNullItems = items.filter(
      (item): item is NonNullable<typeof item> & { uid: string } =>
        item !== null && 'uid' in item && typeof item.uid === 'string',
    )

    if (nonNullItems.length === 0) return

    setIsSubmitting(true)
    setError(null)

    try {
      const removePromises = nonNullItems.map((item) =>
        removeItem({ variables: { cartId, uid: item.uid } }),
      )

      await Promise.all(removePromises)

      await cartQuery.refetch()
    } catch (err) {
      console.error('Failed to clear cart:', err)
      setError(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    submit: handleClearCart,
    formState: { isSubmitting },
    error,
  }
}
