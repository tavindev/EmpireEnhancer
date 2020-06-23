import OptionsSync from "webext-options-sync";
import { DEFAULTS } from "./settings";

const storage = new OptionsSync({
  defaults: DEFAULTS,

  // List of functions that are called when the extension is updated
  migrations: [
    (savedOptions, currentDefaults) => {
      // Perhaps it was renamed
      if (savedOptions.colour) {
        savedOptions.color = savedOptions.colour;
        delete savedOptions.colour;
      }
    },

    // Integrated utility that drops any properties that don't appear in the defaults
    OptionsSync.migrations.removeUnused
  ]
});

export default storage;
