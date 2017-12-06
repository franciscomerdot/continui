import { CliStepOptionParsingService } from "./cliStepOptionParsingService";
import { IdentifiedStepOptionMaps } from "../types";

import * as minimist from 'minimist'

/**
 * Represens a parser that parse from cli arguments to identified step options map. 
 */
export class BuildInCliStepOptionParsingService implements CliStepOptionParsingService {
    /**
     * Parse cli arguments into identified step option map.
     * @param cliArguments Represents the cli arguments.
     * @param stepIdentifiers Represens the steps identifiers.
     * @returns An identified step option map.
     */
    public parse(cliArguments: any[], stepIdentifiers: string[]) : IdentifiedStepOptionMaps {
        let minimistParsedArguments = minimist(cliArguments.slice(2))
        let identifiedStepOptionMap: IdentifiedStepOptionMaps = {};

        identifiedStepOptionMap['main'] = {
            steps: minimistParsedArguments._,
            needsVersion: !!(minimistParsedArguments.v || minimistParsedArguments.version),
            needsHelp: !!(minimistParsedArguments.h || minimistParsedArguments.help)
        }

        stepIdentifiers.forEach(stepIdentifier => {
            let stepOptions = minimistParsedArguments[stepIdentifier];
            
            if (stepOptions) {
                if (typeof stepOptions !== 'object') {
                    throw new Error(`The provided options for step ${stepIdentifier} are not valid.`);                
                }

                identifiedStepOptionMap[stepIdentifier] = minimistParsedArguments[stepIdentifier]
            } else {
                identifiedStepOptionMap[stepIdentifier] = {}
            }
        })

        return identifiedStepOptionMap;
    }
}