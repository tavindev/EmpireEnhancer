import select from "select-dom";

import { isLoggedIn } from "../helpers/user";
import {
  hasFeatureAttribute,
  setFeatureAttribute
} from "../helpers/dom-element";

import inventoryPriceComponent from "../components/inventory-price";

const FEATURE_ATTRIBUTE = Math.random()
  .toString(36)
  .substr(2, 9);

export default async parent => {
  if (!hasFeatureAttribute(FEATURE_ATTRIBUTE, parent)) {
    setFeatureAttribute(FEATURE_ATTRIBUTE, parent);
    parent.getElementsByTagName("button")[0].click();
    return true;
  }
};
