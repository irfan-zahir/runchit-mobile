import React from 'react'
import { AuthenticatedScreenProps } from '@typings/navigation.d'
import { ConfigurationsNavigation } from '@navigation/configNavigation'

export const Configurations = (props: AuthenticatedScreenProps<"Configurations">) => <ConfigurationsNavigation />
