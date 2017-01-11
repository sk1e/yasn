import colors from 'theme/colors.json';
import CircularArcsView from 'shared/circular-arcs-view';

const PieChartView = class extends CircularArcsView {
  static get fillColors() {
    return [
      colors['theme-color-3-foreground'],
      colors['theme-color-2'],
      colors['theme-color-1'],
      colors['theme-color-3'],
    ];
  }
};

export default PieChartView;

