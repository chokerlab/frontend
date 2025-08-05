import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import { Heading, Text } from "@medusajs/ui"

import Divider from "@modules/common/components/divider"

type ShippingDetailsProps = {
  order: HttpTypes.StoreOrder
}

const ShippingDetails = ({ order }: ShippingDetailsProps) => {
  return (
    <div>
      <Heading level="h2" className="flex flex-row text-3xl-regular my-6">
        Delivery
      </Heading>
      <div className="flex items-start gap-x-8">
        <div
          className="flex flex-col w-1/3"
          data-testid="shipping-address-summary"
        >
          <Text className="txt-medium-plus text-ui-fg-base mb-1">
            Shipping Address
          </Text>
          <Text className="txt-medium text-ui-fg-subtle">
            {order.shipping_address?.first_name}{" "}
            {order.shipping_address?.last_name}
          </Text>
          <Text className="txt-medium text-ui-fg-subtle">
            {order.shipping_address?.address_1}{" "}
            {order.shipping_address?.address_2}
          </Text>
          <Text className="txt-medium text-ui-fg-subtle">
            {order.shipping_address?.postal_code},{" "}
            {order.shipping_address?.city}
          </Text>
          <Text className="txt-medium text-ui-fg-subtle">
            {order.shipping_address?.country_code?.toUpperCase()}
          </Text>
        </div>

        <div
          className="flex flex-col w-1/3 "
          data-testid="shipping-contact-summary"
        >
          <Text className="txt-medium-plus text-ui-fg-base mb-1">Contact</Text>
          <Text className="txt-medium text-ui-fg-subtle">
            {order.shipping_address?.phone}
          </Text>
          <Text className="txt-medium text-ui-fg-subtle">{order.email}</Text>
        </div>

        <div
          className="flex flex-col w-1/3"
          data-testid="shipping-method-summary"
        >
          <Text className="txt-medium-plus text-ui-fg-base mb-1">Method</Text>
          <Text className="txt-medium text-ui-fg-subtle">
            {(order as any).shipping_methods[0]?.name} (
            {convertToLocale({
              amount: order.shipping_methods?.[0].total ?? 0,
              currency_code: order.currency_code,
            })
              .replace(/,/g, "")
              .replace(/\./g, ",")}
            )
          </Text>
        </div>
      </div>
      
      {/* Fulfillment Tracking Information */}
      {(order as any).fulfillments && (order as any).fulfillments.length > 0 && (
        <>
          <Divider className="mt-8" />
          <div className="mt-8">
            <Text className="txt-medium-plus text-ui-fg-base mb-4">
              Tracking Information
            </Text>
            <div className="space-y-4">
              {(order as any).fulfillments.map((fulfillment: any, index: number) => (
                <div key={fulfillment.id || index} className="border rounded-lg p-4">
                  <Text className="txt-medium text-ui-fg-base mb-2">
                    Fulfillment {index + 1}
                  </Text>
                  {fulfillment.labels && fulfillment.labels.length > 0 ? (
                    <div className="space-y-3">
                      {fulfillment.labels.map((label: any, labelIndex: number) => (
                        <div key={label.id || labelIndex} className="bg-gray-50 rounded p-3">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Text className="txt-medium text-ui-fg-subtle mb-1">
                                Tracking Number
                              </Text>
                              <Text className="txt-medium text-ui-fg-base">
                                {label.tracking_number || 'N/A'}
                              </Text>
                            </div>
                            <div>
                              <Text className="txt-medium text-ui-fg-subtle mb-1">
                                Tracking URL
                              </Text>
                              {label.tracking_url && label.tracking_url !== "#" ? (
                                <a 
                                  href={label.tracking_url} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="txt-medium text-blue-600 hover:underline"
                                >
                                  View Tracking
                                </a>
                              ) : (
                                <Text className="txt-medium text-ui-fg-subtle">
                                  N/A
                                </Text>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <Text className="txt-medium text-ui-fg-subtle">
                      No tracking information available
                    </Text>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
      
      <Divider className="mt-8" />
    </div>
  )
}

export default ShippingDetails
