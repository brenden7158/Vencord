/*
 * Vencord, a modification for Discord's desktop app
 * Copyright (c) 2022 OpenAsar
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

import { Link } from "@components/Link";
import definePlugin from "@utils/types";
import { Forms } from "@webpack/common";
const appIds = [
    "412797059612278785",
    "752999910097289267",
    "759604595810107412",
    "911790844204437504",
    "886578863147192350",
    "1020414178047041627",
    "1032800329332445255"
];
export default definePlugin({
    name: "richerMusic",
    description: "Enhances popular music apps by adding the \"Listening to\" type prefix to the user's rich presence when an applicable ID is found.",
    authors: [{
        id: 191621342473224192n,
        name: "cryptofyre",
    }],
    patches: [
        {
            find: '.displayName="LocalActivityStore"',
            replacement: {
                match: /LOCAL_ACTIVITY_UPDATE:function\((\i)\)\{/,
                replace: "$&$self.patchActivity($1.activity);",
            }
        }
    ],
    settingsAboutComponent: () => (
        <>
            <Forms.FormTitle tag="h3">What music apps are supported</Forms.FormTitle>
            <Forms.FormText>
                Currently, Cider and WACUP (Winamp Community Update Project) are supported but other popular music apps will be supported later.
            </Forms.FormText>
            <br></br>
            <Forms.FormTitle tag="h3">Recommended Optional Plugins</Forms.FormTitle>
            <Forms.FormText>
                I'd recommend using TimeBarAllActivities alongside this plugin to give off a much better visual to the eye (Keep in mind this only affects your client and will not show for other users)
            </Forms.FormText>
        </>
    ),
    patchActivity(activity: any) {
        if (appIds.includes(activity.application_id)) {
            activity.type = 2; /* LISTENING type */
        }
    },
});
