import { reducer as weatherReducer } from '../Features/Weather/reducer';
import { reducer as multipleReducer } from '../Features/Metrics/sliceReducer'
import { reducer as activeMetrics } from '../Features/ActiveMetrics/sliceReducer'
import { reducer as waterTempReducer } from '../Features/WaterTemp/reducer';
import { reducer as heartBeatReducer } from '../Features/Graph/sliceReducer';

export default {
  weather: weatherReducer,
  activeMetrics: activeMetrics,
  multipleData: multipleReducer,
  waterTemp: waterTempReducer,
  graphData: heartBeatReducer,

};
