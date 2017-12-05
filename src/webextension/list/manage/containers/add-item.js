/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { Localized } from "fluent-react";
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";

import Button from "../../../widgets/button";
import { startNewItem } from "../../actions";
import { NEW_ITEM_ID } from "../../common";
import * as telemetry from "../../../telemetry";

function AddItem({disabled, onAddItem}) {
  return (
    <Localized id="toolbar-add-item">
      <Button theme="primary" disabled={disabled} onClick={onAddItem}>
        aDd iTEm
      </Button>
    </Localized>
  );
}

AddItem.propTypes = {
  disabled: PropTypes.bool.isRequired,
  onAddItem: PropTypes.func.isRequired,
};

export default connect(
  (state) => ({
    disabled: state.list.selectedItemId === NEW_ITEM_ID,
  }),
  (dispatch) => ({
    onAddItem: () => {
      telemetry.recordEvent("addClick", "addButton");
      dispatch(startNewItem());
    },
  })
)(AddItem);
