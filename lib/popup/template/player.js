core.main.player = {
  type: 'folder',
  label: 'player',
  icon: new SvgRenderer('svg')
    .setAttribute('viewBox', '0 0 172 172')
    .appendChildren(new SvgRenderer('path').setAttribute('d', 'M28.66667,14.33333v143.33333l124.07292,-71.66667z')),

  content: {
    type: 'main',
    label: 'player',

    content: {
      player: {
        type: 'section',
        label: 'general',

        content: {
          header_on_hover: {
            type: 'checkbox',
            key: 'header_on_hover',
            label: 'headerOnHover',
          },
          hide_subtitles: {
            type: 'checkbox',
            key: 'hide_subtitles',
            label: 'hideSubtitles',
          },
          hide_dim_screen: {
            type: 'checkbox',
            key: 'hide_dim_screen',
            label: 'hideDimScreen',
          },
          disable_numpad: {
            type: 'checkbox',
            key: 'disable_numpad',
            label: 'disableNumpad',
          },
          runnerThumbnail: {
            type: 'select',
            key: 'runnerThumbnail',
            label: 'runnerThumbnail',
            options: [
              {
                label: 'default',
                value: '',
              },
              {
                label: 'blur',
                value: 'blur',
              },
              {
                label: 'hide',
                value: 'hide',
              },
            ],
          },
          hide_ui: {
            type: 'select',
            key: 'hide_ui',
            label: 'hideUi',
            options: [
              {
                label: 'default',
                value: '',
              },
              {
                label: 'whilePlaying',
                value: 'playing',
              },
              {
                label: 'whileFullscreen',
                value: 'fullscreen',
              },
              {
                label: 'whilePlayingOrFullscreen',
                value: 'playingOrFullscreen',
              },
              {
                label: 'whilePlayingAndFullscreen',
                value: 'playingAndFullscreen',
              },
            ],
          },
        },
      },

      skip_events: {
        type: 'section',
        label: 'skipEvents',

        content: {
          skip_event_intro: {
            type: 'select',
            key: 'skip_event_intro',
            label: 'crunchyrollIntro',
            options: [
              {
                label: 'show',
                value: 1,
              },
              {
                label: 'autoSkip',
                value: 2,
              },
              {
                label: 'hide',
                value: 0,
              },
            ],
          },
          custom: {
            type: 'select',
            label: 'extName',
            getInitValue: () => chromeStorage.auto_skip ? 'autoSkip' : chromeStorage.hide_skip_button ? 'hide' : 'show',
            on: {
              change: ({ target: { value } }) => {
                if (value === 'hide') {
                  chromeStorage.auto_skip = false;
                  chromeStorage.hide_skip_button = true;
                } else if (value === 'show') {
                  chromeStorage.auto_skip = false;
                  chromeStorage.hide_skip_button = false;
                } else if (value === 'autoSkip') {
                  chromeStorage.auto_skip = true;
                  chromeStorage.hide_skip_button = false;
                }
              },
            },
            options: [
              {
                label: 'show',
                value: 'show',
              },
              {
                label: 'autoSkip',
                value: 'autoSkip',
              },
              {
                label: 'hide',
                value: 'hide',
              },
            ],
          },
        },
      },
      buttons: {
        type: 'section',
        label: 'buttons',

        content: {
          hide_play_pause_button: {
            type: 'checkbox',
            key: 'hide_play_pause_button',
            label: 'hidePlayPauseButton',
          },
          fast_backward_buttons: {
            type: 'numberList',
            key: 'fast_backward_buttons',
            label: 'fastBackwardButtons',
            placeholder: '30,10',
          },
          fast_forward_buttons: {
            type: 'numberList',
            key: 'fast_forward_buttons',
            label: 'fastForwardButtons',
            placeholder: '30,90',
          },
        },
      },
    },
  },
};