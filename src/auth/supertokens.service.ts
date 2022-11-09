import { Injectable, Inject } from '@nestjs/common'

import supertokens from "supertokens-node"
import Session from 'supertokens-node/recipe/session'
import Dashboard from "supertokens-node/recipe/dashboard"
import ThirdPartyEmailPassword from 'supertokens-node/recipe/thirdpartyemailpassword'

import { ConfigInjectionToken, AuthModuleConfig } from "./config.interface";

@Injectable()
export class SupertokensService {
    constructor(@Inject(ConfigInjectionToken) private config: AuthModuleConfig) {
        console.log(config);

        supertokens.init({
            appInfo: config.appInfo,
            supertokens: {
                connectionURI: config.connectionURI,
                //apiKey: config.apiKey
            },
            recipeList: [
                ThirdPartyEmailPassword.init({
                    providers: [
                        ThirdPartyEmailPassword.Google({
                            clientId: "1060725074195-kmeum4crr01uirfl2op9kd5acmi9jutn.apps.googleusercontent.com",
                            clientSecret: "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"
                        })
                    ]
                }),
                Dashboard.init({
                    apiKey: "1234"
                }),
                Session.init()
            ]
        })
    }
}
