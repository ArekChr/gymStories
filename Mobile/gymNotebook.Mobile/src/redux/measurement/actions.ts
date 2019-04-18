import { Dispatch } from "redux";
import firebase from "react-native-firebase";
import { CREATE_MEASUREMENT_REQ, CREATE_MEASUREMENT_SUC } from "./types";

interface Measure {
    type: MeasureType
    measure: number
    createdAt: number
}

export type MeasureType = | 'biceps' | 'triceps' | 'weight' | 'chest'

export const createMeasure = (userId: string, measurement: Measure) => {
    return (dispatch: Dispatch) => {
        dispatch({ type: CREATE_MEASUREMENT_REQ })

        const timestamp = new Date().setHours(0,0,0,0)

        const measureRef = firebase.firestore()
            .collection('profiles').doc(userId)
            .collection('measurement').doc(userId)
            .collection(measurement.type)

        measureRef.where('createdAt', '==', timestamp).get().then((snapshot) => {
            const data = snapshot.docs.filter(x => x.data())
            if (data.length) {
                measureRef.doc(data[0].id!).update({
                    timestamp,
                    measure: measurement.measure
                })
            } else {
                measureRef.add({
                    timestamp,
                    measure: measurement.measure
                })
            }      
        }).then(() => {
            dispatch({ type: CREATE_MEASUREMENT_SUC })
        })
    }
}