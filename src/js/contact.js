(() => {
  if (document.referrer) {
    const path = new URL(document.referrer).pathname.split("/").filter((e) => !!e);
    const _index = path.indexOf("services");
    if (_index >= 0) {
      const referrerService = path[_index + 1];
      document.getElementById("form-subject").value = `service-${referrerService}`;
    }
  }

  const resetButton = document.getElementById("reset-form");
  const formFields = document.querySelectorAll(".form__field");
  resetButton.addEventListener("click", () => {
    Array.prototype.forEach.call(formFields, (el) => {
      el.value = "";
    });
  });
})();
