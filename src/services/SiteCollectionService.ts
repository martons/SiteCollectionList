import { WebPartContext } from "@microsoft/sp-webpart-base";
import { sp } from "@pnp/sp";
import "@pnp/sp/search";
import { SearchResults, SearchQueryBuilder, SortDirection } from "@pnp/sp/search";

export interface ISiteCollection {
    title: string;
    url: string;
    refinablestring: string;
}

export interface IResult {
    items: ISiteCollection[],
    totalRows: number;
}

export default class SiteCollectionService {
   
    constructor(
        private context: WebPartContext,
        private pageSize: number,
        private mainProperty: string) {

        sp.setup({
            spfxContext: this.context
        });
    }

    public async get(text: string, direction: SortDirection, page: number): Promise<IResult> {
        
        let query = SearchQueryBuilder()
            .text(`contentclass:STS_Site Title:${text}*"`) // TODO: Change Title by MainProperty
            .sortList({Property: 'SPSiteUrl', Direction: direction})
            .selectProperties("Title", "SPSiteUrl", this.mainProperty)
            .rowLimit(this.pageSize)
            .startRow(this.pageSize * page)
            
            .enableSorting
            .enablePhonetic;

        const results: SearchResults = await sp.search(query);

        return {
            items: results.PrimarySearchResults.map(r => {
                return { 
                    title: r.Title, 
                    url: r.SPWebUrl,
                    refinablestring: r[this.mainProperty]
                }
            }),
            totalRows: results.TotalRows
        }
        
    }

}