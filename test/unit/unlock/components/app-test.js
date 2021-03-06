/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { expect } from "chai";
import React from "react";
import sinon from "sinon";
import waitUntil from "async-wait-until";

import mountWithL10n from "test/mocks/l10n";
import App from "src/webextension/unlock/components/app";

describe("unlock > components > <App/>", () => {
  let wrapper, spyMessage, spyOptions;

  beforeEach(() => {
    wrapper = mountWithL10n(
      <App />
    );
    spyMessage = sinon.spy();

    browser.runtime.onMessage.addListener(spyMessage);
    spyOptions = sinon.spy(browser.runtime, "openOptionsPage");
  });
  afterEach(() => {
    browser.runtime.onMessage.mockClearListener();
    browser.runtime.openOptionsPage.restore();

    spyMessage.resetHistory();
    spyOptions.resetHistory();
  });

  it("render app", () => {
    const wrapper = mountWithL10n(
      <App/>
    );

    expect(wrapper.find("h1")).to.have.text("lOCKBOx");
    expect(wrapper.find("h2")).to.have.text("lOCKBOx tAGLINe");
    expect(wrapper.findWhere(
      (x) => x.prop("id") === "unlock-action-signin").find("button")
    ).to.have.text("sIGn iN");
    expect(wrapper.findWhere(
      (x) => x.prop("id") === "unlock-action-prefs").find("button")
    ).to.have.text("pREFs");
  });

  it("click signin", async () => {
    wrapper.findWhere((x) => x.prop("id") === "unlock-action-signin")
           .find("button").simulate("click");
    waitUntil(() => spyMessage.callCount === 1);

    expect(spyMessage).to.have.been.calledWith({
      type: "signin",
      view: "manage",
    });
  });

  it("click prefs", async () => {
    wrapper.findWhere((x) => x.prop("id") === "unlock-action-prefs")
           .find("button").simulate("click");
    waitUntil(() => spyOptions.callCount === 1);

    expect(spyOptions).to.have.been.calledWith();
  });
});
