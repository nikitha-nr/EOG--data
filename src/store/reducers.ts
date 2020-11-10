import { reducer as weatherReducer } from '../Features/Weather/reducer';
import { reducer as multipleReducer } from '../Features/Metrics/sliceReducer'
import { reducer as activeMetrics } from '../Features/ActiveMetrics/sliceReducer'
import { reducer as waterTempReducer } from '../Features/WaterTemp/reducer';
import { reducer as heartBeatReducer } from '../Features/Graph/sliceReducer';
import { reducer as oilTempReducer} from '../Features/OilTemp/reducer';

export default {
  weather: weatherReducer,
  activeMetrics: activeMetrics,
  multipleData: multipleReducer,
  waterTemp: waterTempReducer,
  graphData: heartBeatReducer,
  oilTemp: oilTempReducer,

};
