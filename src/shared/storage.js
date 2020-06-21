import OptionsSync from "webext-options-sync";
import { DEFAULTS } from "../shared/settings";

const storage = new OptionsSync({ defaults: DEFAULTS });

export default storage;
