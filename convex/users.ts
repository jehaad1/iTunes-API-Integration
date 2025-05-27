import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createList = mutation({
  args: {
    userId: v.string(),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const document = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .first();

    if (document) {
      const id = crypto.randomUUID();
      await ctx.db.patch(document._id, {
        lists: [...document.lists, { listId: id, name: args.name }],
      });
      return id;
    }
  },
});

export const deleteList = mutation({
  args: {
    listId: v.string(),
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const document = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .first();

    if (document) {
      await ctx.db.patch(document._id, {
        lists: document.lists.filter((list) => list.listId !== args.listId),
      });
    }
  },
});

export const getLists = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const document = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .first();

    if (document) return document.lists;
  },
});

export const getTracks = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const document = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .first();

    if (document) return document.tracks;
  },
});

export const updateTrack = mutation({
  args: {
    trackId: v.number(),
    trackName: v.string(),
    artworkUrl100: v.string(),
    lists: v.array(v.string()),
    shortDescription: v.optional(v.string()),
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const document = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .first();

    if (document)
      await ctx.db.patch(document._id, {
        tracks: document?.tracks.some((track) => track.trackId === args.trackId)
          ? document.tracks.map((track) => {
              if (track.trackId === args.trackId) {
                track.lists = args.lists;
                return track;
              }
              return track;
            })
          : [
              ...document.tracks,
              {
                trackId: args.trackId,
                trackName: args.trackName,
                artworkUrl100: args.artworkUrl100,
                shortDescription: args.shortDescription,
                lists: args.lists,
              },
            ],
      });
  },
});
