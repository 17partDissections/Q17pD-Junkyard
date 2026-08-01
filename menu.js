document.addEventListener("DOMContentLoaded", async () => {
  const type = document.body.dataset.ascii || "default";
  const path = `/assets/ascii/${type}.txt`;
  let ascii = "";
  try {
    const response = await fetch(path);
    ascii = await response.text();
  }
  catch (e) {
    const fallback = await fetch("/assets/ascii/default.txt");
    ascii = await fallback.text();
  }
  const menu = `
<div id="banner_outline">
  <div id="banner">
    <div id="logo"><pre>${ascii}</pre>
<img src="/assets/images/arcueid.png"
height="125" width="125"
style="margin: -137px 0px 0px 853px; image-rendering: pixelated; image-rendering: crisp-edges;" />
    </div>
  </div>

  <div id="navBox">
    <div id="navBoxmenu">
      <ul>
        <li><a class="button" href="/index.html">Main</a></li>
        <li><a class="button" href="/news.html">News</a></li>
        <li><a class="button" href="/projects.html">Projects</a></li>
        <li><a class="button" href="/contacts.html">Contacts</a></li>
      </ul>
    </div>
  </div>
</div>
`;
  document.getElementById("menu").innerHTML = menu;
});