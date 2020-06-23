import select from "select-dom";

import storage from "../../shared/storage";
import waitAjax from "./wait-ajax";

export const isFeatureEnabled = async option => {
  const options = await storage.getAll();
  const featureEnabled = Array.isArray(option)
    ? option.some(opt => options[opt])
    : options[option];

  return featureEnabled;
};

export const runFeatureIf = async (option, feature, parent) => {
  const featureEnabled = await isFeatureEnabled(option);

  if (featureEnabled) {
    feature(parent);
  }
};
