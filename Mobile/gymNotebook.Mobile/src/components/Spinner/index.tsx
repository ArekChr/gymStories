import * as React from 'react';
import { SkypeIndicator } from 'react-native-indicators';

interface Props {
    size?: number
}

const Spinner: React.SFC<Props> = (props) => {
    return <SkypeIndicator size={props.size} color='gray' />
}

export default Spinner