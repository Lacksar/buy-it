import React from 'react'
import Layout from './Layout'

const dashboard = () => {
    return (
        <>
            <Layout>

                <div class="flex items-center justify-center p-4">
                    <div class="flex flex-col max-w-7xl w-full md:w-[70%]">
                        <div class="flex flex-col lg:flex-row ">
                            <div class="bg-white shadow-lg rounded-xl flex items-start h-32 w-[90%] lg:w-1/2 justify-center py-4 px-8 mx-4 my-2">
                                <div class="flex items-center justify-start w-full">
                                    <div class="flex-col w-[85%]">
                                        <div class="text-sm font-medium text-violet-600 my-2">Total Income</div>
                                        <div class="class flex items-center">
                                            <div class="text-3xl font-bold text-gray-700">$2,30,568</div>
                                            <div class="flex items-center justify-between mx-2 px-0.5 py-0.5 rounded-xl text-green-500 font-medium ">
                                                <div class="text-xs bg-green-200 px-2 rounded-lg">+ 78%</div>
                                            </div>
                                        </div>
                                        <div class="w-full h-1 rounded bg-gray-300 my-1">
                                            <div class="w-[78%] h-1 rounded bg-green-500"></div>
                                        </div>
                                        <div class="text-xs font-medium text-gray-400 ">Weekly Goal</div>
                                    </div>
                                </div>
                            </div>
                            <div class="bg-white shadow-lg rounded-xl flex items-start h-32 w-[90%] lg:w-1/2 justify-center py-4 px-8 mx-4 my-2">
                                <div class="flex items-center justify-start w-full">
                                    <div class="flex-col w-[85%]">
                                        <div class="text-sm font-medium text-violet-600 my-2">Engaged Users</div>
                                        <div class="class flex items-center">
                                            <div class="text-3xl font-bold text-gray-700">32.78%</div>
                                            <div class="flex items-center justify-between mx-2 px-0.5 py-0.5 rounded-xl text-red-500 font-medium ">
                                                <div class="text-xs bg-red-200 px-2 rounded-lg">- 7%</div>
                                            </div>
                                        </div>
                                        <div class="w-full h-1 rounded bg-gray-300 my-1">
                                            <div class="w-[33%] h-1 rounded bg-red-500"></div>
                                        </div>
                                        <div class="text-xs font-medium text-gray-400 ">Daily Goal</div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div class="flex flex-col lg:flex-row ">
                            <div class="bg-white shadow-lg rounded-xl flex items-start max-w-1/2 w-[90%] lg:w-1/2 justify-center py-4 px-4 mx-4 my-2">
                                <div class="flex items-center justify-start w-full">
                                    <div class="flex-col w-[85%]">
                                        <div class="text-sm font-medium text-violet-600 my-2">Weekly Income</div>
                                        <div class="class flex items-center">
                                            <div class="text-3xl font-bold text-gray-700">$6,568</div>
                                            <div class="flex items-center justify-between mx-2 px-0.5 py-0.5 rounded-xl text-green-500 font-medium ">
                                                <div class="text-xs bg-green-200 px-2 rounded-lg">+ 54%</div>
                                            </div>
                                        </div>
                                        <div class="flex items-center justify-between mt-4 ">
                                            <div class="flex-col">
                                                <div class="h-16 w-6 rounded-tr rounded-tl bg-gray-100 mx-2">
                                                    <div class="h-[20%] w-6 rounded-tr rounded-tl bg-green-300"></div>
                                                </div>
                                                <div class="text-xs font-medium ml-2 text-gray-500">Mon</div>
                                            </div>
                                            <div class="flex-col">
                                                <div class="h-16 w-6 rounded-tr rounded-tl bg-gray-100 mx-2">
                                                    <div class="h-[60%] w-6 rounded-tr rounded-tl bg-green-300"></div>
                                                </div>
                                                <div class="text-xs font-medium ml-2 text-gray-500">Tue</div>
                                            </div>
                                            <div class="flex-col">
                                                <div class="h-16 w-6 rounded-tr rounded-tl bg-gray-100 mx-2">
                                                    <div class="h-[70%] w-6 rounded-tr rounded-tl bg-green-300"></div>
                                                </div>
                                                <div class="text-xs font-medium ml-2 text-gray-500">Wed</div>
                                            </div>
                                            <div class="flex-col">
                                                <div class="h-16 w-6 rounded-tr rounded-tl bg-gray-100 mx-2">
                                                    <div class="h-[44%] w-6 rounded-tr rounded-tl bg-green-300"></div>
                                                </div>
                                                <div class="text-xs font-medium ml-2 text-gray-500">Thu</div>
                                            </div>
                                            <div class="flex-col">
                                                <div class="h-16 w-6 rounded-tr rounded-tl bg-gray-100 mx-2">
                                                    <div class="h-[87%] w-6 rounded-tr rounded-tl bg-green-300"></div>
                                                </div>
                                                <div class="text-xs font-medium ml-2 text-gray-500">Fri</div>
                                            </div>
                                            <div class="flex-col">
                                                <div class="h-16 w-6 rounded-tr rounded-tl bg-gray-100 mx-2">
                                                    <div class="h-[55%] w-6 rounded-tr rounded-tl bg-green-300"></div>
                                                </div>
                                                <div class="text-xs font-medium ml-2 text-gray-500">Sat</div>
                                            </div>
                                            <div class="flex-col">
                                                <div class="h-16 w-6 rounded-tr rounded-tl bg-gray-100 mx-2">
                                                    <div class="h-[34%] w-6 rounded-tr rounded-tl bg-green-300"></div>
                                                </div>
                                                <div class="text-xs font-medium ml-2 text-gray-500">Sun</div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div class="bg-white shadow-lg rounded-xl flex items-start max-w-1/2 w-[90%] lg:w-1/2 justify-center py-4 px-4 mx-4 my-2">
                                <div class="flex items-center justify-start w-full">
                                    <div class="flex-col w-[85%]">
                                        <div class="text-sm font-medium text-violet-600 my-2">Weekly Users</div>
                                        <div class="class flex items-center">
                                            <div class="text-3xl font-bold text-gray-700">16,568</div>
                                            <div class="flex items-center justify-between mx-2 px-0.5 py-0.5 rounded-xl text-red-500 font-medium ">
                                                <div class="text-xs bg-red-200 px-2 rounded-lg">- 8.7%</div>
                                            </div>
                                        </div>
                                        <div class="flex items-center justify-between mt-4 ">
                                            <div class="flex-col">
                                                <div class="h-16 w-6 rounded-tr rounded-tl bg-gray-100 mx-2">
                                                    <div class="h-[79%] w-6 rounded-tr rounded-tl bg-violet-300"></div>
                                                </div>
                                                <div class="text-xs font-medium ml-2 text-gray-500">Mon</div>
                                            </div>
                                            <div class="flex-col">
                                                <div class="h-16 w-6 rounded-tr rounded-tl bg-gray-100 mx-2">
                                                    <div class="h-[20%] w-6 rounded-tr rounded-tl bg-violet-300"></div>
                                                </div>
                                                <div class="text-xs font-medium ml-2 text-gray-500">Tue</div>
                                            </div>
                                            <div class="flex-col">
                                                <div class="h-16 w-6 rounded-tr rounded-tl bg-gray-100 mx-2">
                                                    <div class="h-[30%] w-6 rounded-tr rounded-tl bg-violet-300"></div>
                                                </div>
                                                <div class="text-xs font-medium ml-2 text-gray-500">Wed</div>
                                            </div>
                                            <div class="flex-col">
                                                <div class="h-16 w-6 rounded-tr rounded-tl bg-gray-100 mx-2">
                                                    <div class="h-[44%] w-6 rounded-tr rounded-tl bg-violet-300"></div>
                                                </div>
                                                <div class="text-xs font-medium ml-2 text-gray-500">Thu</div>
                                            </div>
                                            <div class="flex-col">
                                                <div class="h-16 w-6 rounded-tr rounded-tl bg-gray-100 mx-2">
                                                    <div class="h-[67%] w-6 rounded-tr rounded-tl bg-violet-300"></div>
                                                </div>
                                                <div class="text-xs font-medium ml-2 text-gray-500">Fri</div>
                                            </div>
                                            <div class="flex-col">
                                                <div class="h-16 w-6 rounded-tr rounded-tl bg-gray-100 mx-2">
                                                    <div class="h-[25%] w-6 rounded-tr rounded-tl bg-violet-300"></div>
                                                </div>
                                                <div class="text-xs font-medium ml-2 text-gray-500">Sat</div>
                                            </div>
                                            <div class="flex-col">
                                                <div class="h-16 w-6 rounded-tr rounded-tl bg-gray-100 mx-2">
                                                    <div class="h-[64%] w-6 rounded-tr rounded-tl bg-violet-300"></div>
                                                </div>
                                                <div class="text-xs font-medium ml-2 text-gray-500">Sun</div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>


            </Layout>
        </>
    )
}

export default dashboard