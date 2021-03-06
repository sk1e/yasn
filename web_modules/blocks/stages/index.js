import $ from 'jquery';
import colors from 'theme/colors.json';

import './stages.styl';

const Stages = class {
  constructor($stages) {
    this.$stages = $stages;
    this.stagesNumber = $stages[0].children.length;
    this.$stage = $stages.find('.js-stages__stage');
    this.attachEventHandlers();
  }

  attachEventHandlers() {
    this.$stages.on('move-to-next-stage:', this.moveToNextStage.bind(this));
  }


  moveToNextStage(_, nextStageIndex) {
    const leftColor = colors['theme-color-2'];
    const leftPercentage = (nextStageIndex / (this.stagesNumber - 1)) * 100;

    const rightColor = colors['theme-color-3'];

    this.$stages.css('background', `linear-gradient(to right, ${leftColor} ${leftPercentage}%, ${rightColor} 0%)`);
    this.$stage.eq(nextStageIndex)
      .removeClass('stages__stage_face_incomplete')
      .addClass('stages__stage_face_complete');
  }
};

$(() => {
  $('.js-stages').each((_, node) => {
    new Stages($(node)); // eslint-disable-line no-new
  });
});
