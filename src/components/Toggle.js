import React from 'react';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../Features/ActiveMetrics/sliceReducer';

export default function Toggle() {
  const [state, setState] = React.useState({
    checkedWaterTemp: false,
  });

  const timeStamp = useSelector(state => state.graphData);
  const dispatch = useDispatch();
  const activeArr = useSelector(state => state.activeMetrics.selectedMetrics);

  const handleChange = name => event => {
    const metric = event.target.value;
    const isChecked = event.target.checked;
    setState({ ...state, [name]: event.target.checked });

    if (isChecked) {
      dispatch(
        actions.active({
          metricName: metric,
          before: timeStamp.current,
          after: timeStamp.past,
        }),
      );
    } else {
      const metricIndex = activeArr.find(element => element.metricName === metric);
      dispatch(actions.remove(metricIndex.metricName));
    }
  };

  return (
    <div>
      <h1>WaterTemperature Data Sample</h1>
      <FormControl component="fieldset">
        <FormGroup aria-label="position" row>
          <FormControlLabel
            value="end"
            control={
              <Switch
                checked={state.checkedWaterTemp}
                onChange={handleChange('checkedWaterTemp')}
                value="waterTemp"
                color="primary"
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
            }
            label="Water Temp"
            labelPlacement="top"
          />
          <FormControlLabel
            value="start"
            control={
              <Switch
                checked={state.checkedB}
                onChange={handleChange('checkedB')}
                value="oilTemp"
                color="primary"
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
            }
            label="Oil Temp"
            labelPlacement="top"
          />
        </FormGroup>
      </FormControl>
    </div>
  );
}
