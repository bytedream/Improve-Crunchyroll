const skippersHandler = new SkippersHandler();
(async () => {
  const vilos = await waitForElement('#vilos', document.documentElement);
  chromeStorage.reload(
    'hide_dim_screen',
    'hide_skip_button',
    'skip_event_credits',
    'skip_event_intro',
    'skip_event_preview',
    'skip_event_recap',
    'hide_subtitles',
    'hide_ui',
    'runnerThumbnail',
    'player_mode',
    'scrollbar',
  );

  const player = await waitForElement('#player0', vilos);
  skippersHandler.init(player);
  playbackHandler(player);
  createAndInsertSvgDefs();
  doubleClickHandler();
  const icDivPlayerControls = createIcDiv();
  const icDivPlayerMode = createDivPlayerMode();
  chromeStorage.LOADED.then(() => createFastForwardBackwardButtons(icDivPlayerControls));
  chrome.storage.onChanged.addListener((changes) => {
    if (changes.fast_backward_buttons || changes.fast_forward_buttons) {
      createFastForwardBackwardButtons(icDivPlayerControls);
    }
  });
  shortcutHandler(skippersHandler);
  const settings = createSettings();

  for await (const mutations of mutationIterator(document.getElementById('vilosRoot'))) {
    const velocityControlsPackage = mutations.reduce(
      (f, { addedNodes }) => f || [...addedNodes].find(({ id }) => id === 'velocity-controls-package'),
      false,
    );
    if (!velocityControlsPackage) return;

    for await (const mutations of mutationIterator(velocityControlsPackage)) {
      const addedNodes = mutations.flatMap(({ addedNodes }) => [...addedNodes]);
      if (addedNodes.length === 0) return;

      const vilosControlsContainer = addedNodes.find((node) => node.id === 'vilosControlsContainer');
      if (vilosControlsContainer) {
        insertCbpDivs(vilosControlsContainer, icDivPlayerControls.getElement(), icDivPlayerMode.getElement());
        for await (const mutations of mutationIterator(vilosControlsContainer)) {
          if (mutations.some(({ addedNodes }) => [...addedNodes].some(({ children }) => children.length > 0))) {
            document.documentElement.setAttribute('ic_vilos_controls', `${true}`);
            insertCbpDivs(vilosControlsContainer, icDivPlayerControls.getElement(), icDivPlayerMode.getElement());
          } else {
            document.documentElement.setAttribute('ic_vilos_controls', `${false}`);
          }
        }
      } else {
        const velocitySettingsMenu = velocityControlsPackage.querySelector('#velocity-settings-menu');
        if (velocitySettingsMenu) insertSettings(velocitySettingsMenu, settings);
      }
    }
  }
})();
