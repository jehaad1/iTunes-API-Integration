import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    userId: v.string(),
    lists: v.array(
      v.object({
        listId: v.string(),
        name: v.string(),
      })
    ),
    tracks: v.array(
      v.object({
        trackId: v.number(),
        trackName: v.string(),
        artworkUrl100: v.string(),
        shortDescription: v.optional(v.string()),
        lists: v.array(v.string()),
      })
    ),
  }),
});
