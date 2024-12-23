import MainLayouts from "@/components/layouts/mainLayouts"
import { useDoaHandler } from "@/core/hooks/doa/useDoaHandler"
import { ComponentManagement } from "@/components";

const DoaPage = () => {
    const {
        DoaCategory,
        loading,
        CategoryDoa,
        DoaByCategory,
        StartIndex,
        HandleChangeTypeDoa
    } = useDoaHandler();

    return (
        <MainLayouts NavigationType="none">
            <ComponentManagement.MosqueHeader title="Prayers" subTitle="Collection" />
            <div className="relative -mt-14 z-20">
                <div className="bg-gray-900 p-3 -bottom-5 rounded-t-2xl">
                    <ComponentManagement.SearchInput placeholder="Find a Prayer" />
                </div>
            </div>
            <div className="p-4">
                <div className="flex  gap-3 overflow-y-auto">
                    <ComponentManagement.LoadingAnimation isLoading={loading}>
                        {
                            DoaCategory.map((item, index) => (
                                <ComponentManagement.DoaCategoryButton key={'doa-category-' + index} title={item} onClick={() => HandleChangeTypeDoa(item)}
                                    CategoryDoa={CategoryDoa === item} />
                            ))
                        }
                    </ComponentManagement.LoadingAnimation>
                </div>

                <div className="grid grid-cols-1 gap-3 mt-7 mb-20">
                    {DoaByCategory?.map((DoaByType, index) => (
                        <div className="col-span-1" key={'doa-' + index}>
                            <ComponentManagement.SimpleDoaCard Doa={DoaByType.judul} index={index} StartIndex={StartIndex} />
                        </div>
                    ))}
                </div>
            </div>
        </MainLayouts>
    )
}

export default DoaPage