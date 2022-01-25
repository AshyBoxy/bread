import { Guild, GuildMember, User } from "discord.js";
import { Client } from "../framework";

function memberFromMention(guild: Guild | null, arg: string): GuildMember | null {
    const id = idFromMention(arg);
    if (!id || !guild) return null;
    const member = guild.members.cache.get(id);
    if (!member) return null;
    return member;
}

function userFromMention(bot: Client, arg: string): User | null {
    const id = idFromMention(arg);
    if (!id) return null;
    const user = bot.users.cache.get(id);
    if (!user) return null;
    return user;
}

function idFromMention(arg: string): string | null {
    if (!arg) return null;
    const mentions = arg.match(/^<@!?(\d+)>$/);
    if (!mentions) return null;
    const id = mentions[1];
    return id;
}

export { memberFromMention, userFromMention, idFromMention };
