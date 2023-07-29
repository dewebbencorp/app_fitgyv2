import { Capacitor } from "@capacitor/core";
import { CapacitorSQLite, SQLiteConnection } from "@capacitor-community/sqlite";
import { JeepSqlite } from "jeep-sqlite/dist/components/jeep-sqlite";

export async function initializeSQLite() {
  const platform = Capacitor.getPlatform();

  if (platform === "web") {
    const sqlite = new SQLiteConnection(CapacitorSQLite);
    customElements.define("jeep-sqlite", JeepSqlite);
    const jeepSqliteEl = document.createElement("jeep-sqlite");
    document.body.appendChild(jeepSqliteEl);
    await customElements.whenDefined("jeep-sqlite");
    console.log("after customElements.whenDefined");

    await sqlite.initWebStore();
    console.log("after initWebStore");
  }
}
