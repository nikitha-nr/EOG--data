import { reducer as weatherReducer } from '../Features/Weather/reducer';
import { reducer as multipleReducer } from '../Features/Metrics/sliceReducer'
import { reducer as activeMetrics } from '../Features/ActiveMetrics/sliceReducer'
import { reducer as waterTempReducer } from '../Features/WaterTemp/reducer';
import { reducer as heartBeatReducer } from '../Features/Graph/sliceReducer';
import { reducer as oilTempReducer} from '../Features/OilTemp/reducer';
import { reducer as casingPReducer} from '../Features/CasingPressure/reducer'
import { reducer as flareTempReducer} from '../Features/FlareTemp/reducer';
import { reducer as tubingPReducer} from '../Features/TubingPressure/reducer';

export default {
  weather: weatherReducer,
  activeMetrics: activeMetrics,
  multipleData: multipleReducer,
  waterTemp: waterTempReducer,
  graphData: heartBeatReducer,
  oilTemp: oilTempReducer,
  casingPressure: casingPReducer,
  flareTemp: flareTempReducer,
  tubingPressure:tubingPReducer,

};
