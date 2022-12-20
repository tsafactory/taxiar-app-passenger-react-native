import {
  ApiResponse, 
  ApisauceInstance,
  create,
} from "apisauce"
import Config from "../../config"
import { GeneralApiProblem, getGeneralApiProblem } from "./resourceProblem" 
import type {
  ApiConfig,
  ApiFeedResponse, 
} from "./resource.types"
import { DatabaseService } from "../database"

export const DEFAULT_API_CONFIG: ApiConfig = {
  url: Config.API_URL,
  timeout: 10000,
}

/**
 * Manages all requests to the API.
 */
export class Resource {
  apisauce: ApisauceInstance
  config: ApiConfig
  token: string;

  /**
   * Set up our API instance. Keep this lightweight!
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
    
    let configStruct = {
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
        Authorization: ""
      },
    }
    
    if(this.token){
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      configStruct = {
        baseURL: this.config.url,
        timeout: this.config.timeout,
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${this.token}`
        }
      }
    }

    this.apisauce = create(configStruct)
    this.apisauce.axiosInstance.interceptors.request.use( (config) => {
      const token = DatabaseService.get('token');      
      if(token && token.token){
        config.headers.Authorization = `Bearer ${token.token}`
      }
      return config
    },     
    (error) => {
      console.log('ERROR REJECT', error);
      Promise.reject(error);
    },)
  }

  async get(url: string, data: any): Promise< any | GeneralApiProblem> {
    const renderUrl = this.renderUrl(url, data)
    const response: ApiResponse<ApiFeedResponse> = await this.apisauce.get(renderUrl.urlWithParams)

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    return response
  }

  async post(url: string, data: any): Promise< any | GeneralApiProblem> {
    const renderUrl = this.renderUrl(url, data)
    const response: ApiResponse<ApiFeedResponse> = await this.apisauce.post(renderUrl.url, renderUrl.body);

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    return response
  }

  async deleete (url: string, data: any): Promise< any | GeneralApiProblem> {
    const renderUrl = this.renderUrl(url, data)
    const response: ApiResponse<ApiFeedResponse> = await this.apisauce.delete(renderUrl.url);
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    return response
  }

  async put(url: string, data: any): Promise< any | GeneralApiProblem> {
    const renderUrl = this.renderUrl(url, data)
    const response: ApiResponse<ApiFeedResponse> = await this.apisauce.put(renderUrl.url, data);

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    return response
  }

  private renderUrl(template: string, data: any) {
    if (!data) return { url: template, urlWithParams: template, body: undefined }
    // eslint-disable-next-line no-useless-escape
    const regex = /([^:])+([^\/])+/gi
    const parts = []
    const usedVars = []
    const queryParams = []
    const body = {}
    let m

    while ((m = regex.exec(template)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (m.index === regex.lastIndex) {
        regex.lastIndex++
      }
      const p = m[0].split(":")
      parts.push(p[0])
      if (p.length > 1) {
        const v = p[1]
        parts.push(data[v])
        usedVars.push(v)
      }
    }
    for (const k in data) {
      if (usedVars.indexOf(k) < 0) {
        queryParams.push(k + "=" + data[k])
        body[k] = data[k]
      }
    }
    const url = parts.join("")
    let urlWithParams = url
    if (queryParams.length > 0) {
      urlWithParams += "?" + queryParams.join("&")
    }
    return { url: url, urlWithParams: urlWithParams, body: body }
  }
}

// Singleton instance of the API for convenience
export const ResourceService = new Resource()
