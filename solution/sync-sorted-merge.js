"use strict";

// Print all entries, across all of the sources, in chronological order.

module.exports = (logSources, printer) => {
  // Let's declare an array for store all the merged entries that will be sorted
  // at the end before printing them
  const mergedLogs = [];

  // For each value of the log sources...
  logSources.forEach((logSource, index) => {
    // lets extract the first entry of feach registry
    const firstEntry = logSource.pop();
    // If that entry is not false, push it to the final array of result
    if (firstEntry !== false) {
      // let's pushe and object with the actual entry and an index that will use
      // later for acces the next registry
      mergedLogs.push({ firstEntry, index });
    }
  });

  // Now let's sort all themerged registries of the array
  // by date
  mergedLogs.sort((a, b) => a.entry.date - b.entry.date);

  // While that array has data
  while (mergedLogs.length > 0) {
    // Let's obtain the older registry and print it:
    const oldestEntry = mergedLogs.shift();
    // and print that entry
    printer.print(oldestEntry.entry);
    // Now get the next registry of the same source, and pop it:
    const nextEntry = logSources[oldestEntry.index].pop();
    // If there are a next registry, push it to the merged array and sort the array again:
    if (nextEntry !== false) {
      mergedLogs.push({ entry: nextEntry, index: oldestEntry.index });
      mergedLogs.sort((a, b) => a.entry.date - b.entry.date);
    }
  }
  console.log(printer.done());
};
