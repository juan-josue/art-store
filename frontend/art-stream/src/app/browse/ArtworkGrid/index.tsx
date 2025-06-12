import Filter from "./Filter";
import Grid from "./Grid";

export default function ArtworkGrid() {
  return (
    <div className="relative flex gap-8 w-full max-w-7xl justify-end">
      <Filter />
      <Grid />
    </div>
  );
}
