// [0,1,...,63]
export const vecToy = new Float32Array(Array.from(Array(64).keys()));

export const vecRealistic = new Float32Array(
  JSON.parse(
    '[0.0082244873046875,0.00888824462890625,0.00707244873046875,0.006252288818359375,0.00714111328125,0.00601959228515625,0.00583648681640625,0.005046844482421875,0.006195068359375,0.006679534912109375,0.005767822265625,0.0059814453125,0.010467529296875,0.01107025146484375,0.013458251953125,0.0115509033203125,0.0128173828125,0.0098114013671875,0.0042266845703125,0.0022411346435546875,0.0009756088256835938,0.0010023117065429688,0.0009074211120605469,0.0016231536865234375,0.002017974853515625,0.00046753883361816406,0.0008697509765625,0.0004627704620361328,0.000957489013671875,0.0011911392211914062,0.0012388229370117188,0.0012683868408203125,0.001361846923828125,0.0020084381103515625,0.0012483596801757812,0.060516357421875,0.075439453125,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.0014429092407226562,0.0027904510498046875,0.0032138824462890625,0.0013952255249023438,0.0009503364562988281,0.002880096435546875,0.0034313201904296875,0.002910614013671875,0.002895355224609375,0.0030670166015625,0.003170013427734375,0.003551483154296875,0.0034332275390625,0.00307464599609375,0.0031032562255859375,0.003627777099609375,0.0030574798583984375,0.0032596588134765625,0.0031909942626953125,0.00261688232421875,0.0033626556396484375,0.0032672882080078125,0.00395965576171875,0.00353240966796875,0.003414154052734375,0.00359344482421875,0.00464630126953125,0.003444671630859375,0.0033130645751953125,0.0034961700439453125,0.0037994384765625,0.003498077392578125,0.00389862060546875,0.0037708282470703125,0.004322052001953125,0.004383087158203125,0.00583648681640625,0.006687164306640625,0.00762176513671875,0.005725860595703125,0.004550933837890625,0.004123687744140625,0.004421234130859375,0.004482269287109375,0.003902435302734375,0.0038852691650390625,0.0034942626953125,0.0038204193115234375,0.00396728515625,0.0038509368896484375,0.0031681060791015625,0.0036563873291015625,0.003345489501953125,0.0032806396484375,0.0036220550537109375,0.00371551513671875,0.003101348876953125,0.0033435821533203125,0.0036373138427734375,0.00406646728515625,0.0034847259521484375,0.003139495849609375,0.003749847412109375,0.00212860107421875,0.002964019775390625,0.003307342529296875,0.0031108856201171875,0.003662109375,0.0036373138427734375,0.003971099853515625,0.00424957275390625,0.0033817291259765625,0.0028705596923828125,0.0031566619873046875,0.003917694091796875,0.004062652587890625,0.00408935546875,0.003177642822265625,0.0027942657470703125,0.0028285980224609375,0.0027561187744140625,0.0032825469970703125,0.003475189208984375,0.0027904510498046875,0.003391265869140625,0.00345611572265625,0.00344085693359375,0.003322601318359375,0.003719329833984375,0.0032520294189453125,0.003345489501953125,0.002750396728515625,0.002716064453125,0.0032863616943359375,0.0036163330078125,0.0034542083740234375,0.002994537353515625,0.0033111572265625,0.0035305023193359375,0.0032787322998046875,0.00324249267578125,0.003467559814453125,0.005077362060546875,0.0034732818603515625,0.0031833648681640625,0.00334930419921875,0.003673553466796875,0.004001617431640625,0.0035457611083984375,0.003429412841796875,0.00390625,0.002880096435546875,0.0029659271240234375,0.003955841064453125,0.0038852691650390625,0.003940582275390625,0.0038700103759765625,0.00373077392578125,0.0031890869140625,0.0035686492919921875,0.0035877227783203125,0.003108978271484375,0.004123687744140625,0.003520965576171875,0.0037326812744140625,0.003910064697265625,0.00371551513671875,0.0029811859130859375,0.0034885406494140625,0.004299163818359375,0.004730224609375,0.005161285400390625,0.00490570068359375,0.00424957275390625,0.0037994384765625,0.003185272216796875,0.004199981689453125,0.0054931640625,0.00412750244140625,0.00470733642578125,0.0045166015625,0.0048828125,0.0033111572265625,0.0038585662841796875,0.00435638427734375,0.00588226318359375,0.005710601806640625,0.0046539306640625,0.005558013916015625,0.0043182373046875,0.00548553466796875,0.005298614501953125,0.0043792724609375,0.004486083984375,0.004848480224609375,0.005336761474609375,0.0043792724609375,0.008514404296875,0.004825592041015625,0.004962921142578125,0.00481414794921875,0.0036907196044921875,0.003993988037109375,0.004116058349609375,0.00455474853515625,0.0047149658203125,0.0041656494140625,0.0033855438232421875,0.004058837890625,0.0030803680419921875,0.0030193328857421875,0.004619598388671875,0.00417327880859375,0.00409698486328125,0.003124237060546875,0.00455474853515625,0.0043487548828125,0.00444793701171875,0.0038909912109375,0.003765106201171875,0.0035037994384765625,0.004756927490234375,0.004695892333984375,0.0047149658203125,0.005359649658203125,0.006290435791015625,0.0055999755859375,0.005718231201171875,0.006702423095703125,0.0059967041015625,0.0045166015625,0.005359649658203125,0.00559234619140625,0.004703521728515625,0.0039005279541015625,0.004566192626953125,0.004070281982421875,0.00380706787109375,0.004344940185546875,0.004047393798828125,0.004611968994140625,0.003345489501953125,0.003261566162109375,0.0041351318359375,0.003940582275390625,0.004329681396484375,0.003963470458984375,0.00373077392578125,0.0039520263671875,0.004241943359375,0.004520416259765625,0.0040740966796875,0.00502777099609375,0.007038116455078125,0.007122039794921875,0.007747650146484375,0.00626373291015625,0.005443572998046875,0.005077362060546875,0.005084991455078125,0.0068359375,0.01078033447265625,0.007720947265625,0.01099395751953125,0.00887298583984375,0.00852203369140625,0.0054931640625,0.00547027587890625,0.00463104248046875,0.00400543212890625,0.004711151123046875,0.00482177734375,0.00386810302734375,0.004642486572265625,0.0040740966796875,0.0038547515869140625,0.0032215118408203125,0.003643035888671875,0.0035457611083984375,0.003612518310546875,0.003742218017578125,0.0032978057861328125,0.003894805908203125,0.0035610198974609375,0.003589630126953125,0.003398895263671875,0.0033550262451171875,0.00312042236328125,0.0037479400634765625,0.003963470458984375,0.00424957275390625,0.003742218017578125,0.00389862060546875,0.003582000732421875,0.0033111572265625,0.002941131591796875,0.003635406494140625,0.00344085693359375,0.0032711029052734375,0.0039005279541015625,0.004024505615234375,0.0017614364624023438,0.0017032623291015625,0.0038471221923828125,0.003765106201171875,0.00455474853515625,0.00470733642578125,0.00379180908203125,0.00360107421875,0.004261016845703125,0.00441741943359375,0.00472259521484375,0.00740814208984375,0.00785064697265625,0.005397796630859375,0.006061553955078125,0.00560760498046875,0.005130767822265625,0.004344940185546875,0.005138397216796875,0.005084991455078125,0.006046295166015625,0.00702667236328125,0.006237030029296875,0.0058441162109375,0.00490570068359375,0.00475311279296875,0.00572967529296875,0.005794525146484375,0.00583648681640625,0.005584716796875,0.005886077880859375,0.00630950927734375,0.006145477294921875,0.0059356689453125,0.00481414794921875,0.00502777099609375,0.004032135009765625,0.0039215087890625,0.003688812255859375,0.0029010772705078125,0.0034923553466796875,0.004322052001953125,0.0034503936767578125,0.0033416748046875,0.003337860107421875,0.0032291412353515625,0.0035762786865234375,0.0037364959716796875,0.003604888916015625,0.00408935546875,0.00446319580078125,0.005252838134765625,0.00554656982421875,0.006702423095703125,0.0078582763671875,0.00638580322265625,0.007129669189453125,0.0074920654296875,0.006679534912109375,0.00455474853515625,0.005634307861328125,0.0055694580078125,0.0057220458984375,0.01131439208984375,0.0087738037109375,0.005039215087890625,0.004436492919921875,0.005290985107421875,0.00533294677734375,0.00521087646484375,0.005645751953125,0.00658416748046875,0.006809234619140625,0.008575439453125,0.006744384765625,0.007137298583984375,0.006038665771484375,0.00450897216796875,0.005313873291015625,0.005702972412109375,0.00484466552734375,0.004180908203125,0.003875732421875,0.004787445068359375,0.004871368408203125,0.004199981689453125,0.005153656005859375,0.004650115966796875,0.005397796630859375,0.004795074462890625,0.004512786865234375,0.0046539306640625,0.004291534423828125,0.0045013427734375,0.0044708251953125,0.004375457763671875,0.00434112548828125,0.0034198760986328125,0.005138397216796875,0.004337310791015625,0.0036869049072265625,0.004436492919921875,0.00485992431640625,0.006275177001953125,0.00554656982421875,0.005474090576171875,0.00433349609375,0.005519866943359375,0.004638671875,0.00531768798828125,0.00658416748046875,0.00811767578125,0.0105743408203125,0.01053619384765625,0.0047454833984375,0.004779815673828125,0.004825592041015625,0.004268646240234375,0.004741668701171875,0.003658294677734375,0.005146026611328125,0.00482940673828125,0.004444122314453125,0.004032135009765625,0.005092620849609375,0.004810333251953125,0.004322052001953125,0.004039764404296875,0.00402069091796875,0.004001617431640625,0.00502777099609375,0.00499725341796875,0.00403594970703125,0.0052337646484375,0.00543212890625,0.006031036376953125,0.01194000244140625,0.01161956787109375,0.00629425048828125,0.006916046142578125,0.00675201416015625,0.0079498291015625,0.0078582763671875,0.006290435791015625,0.007556915283203125,0.00592803955078125,0.005298614501953125,0.00586700439453125,0.00579833984375,0.005123138427734375,0.005096435546875,0.005115509033203125,0.004756927490234375,0.00444793701171875,0.004848480224609375,0.004329681396484375,0.005565643310546875,0.006816864013671875,0.00768280029296875,0.00677490234375,0.006374359130859375,0.0053863525390625,0.00666046142578125,0.006687164306640625,0.00624847412109375,0.00609588623046875,0.005588531494140625,0.005619049072265625,0.006465911865234375,0.0060577392578125,0.005779266357421875,0.005558013916015625,0.00667572021484375,0.006893157958984375,0.00992584228515625,0.0076446533203125,0.007762908935546875,0.006938934326171875,0.006500244140625,0.006229400634765625,0.00597381591796875,0.00496673583984375,0.005504608154296875,0.005336761474609375,0.0064239501953125,0.00652313232421875,0.0066070556640625,0.007076263427734375,0.006591796875,0.005039215087890625,0.005702972412109375,0.004917144775390625,0.005466461181640625,0.00530242919921875,0.004726409912109375,0.004505157470703125,0.004985809326171875,0.00431060791015625,0.00473785400390625,0.004638671875,0.00391387939453125,0.0041961669921875,0.004138946533203125,0.004955291748046875,0.0047149658203125,0.00449371337890625,0.00469207763671875,0.0036373138427734375,0.00415802001953125,0.0035495758056640625,0.0034656524658203125,0.00420379638671875,0.0043792724609375,0.00394439697265625,0.00396728515625,0.0037899017333984375,0.003070831298828125,0.00406646728515625,0.004077911376953125,0.00347137451171875,0.0033206939697265625,0.00428009033203125,0.004215240478515625,0.00437164306640625,0.004230499267578125,0.00408172607421875,0.00421905517578125,0.004184722900390625,0.0037746429443359375,0.005237579345703125,0.00632476806640625,0.00766754150390625,0.00494384765625,0.004974365234375,0.004581451416015625,0.004985809326171875,0.0039215087890625,0.00323486328125,0.0029964447021484375,0.00409698486328125,0.0043182373046875,0.003833770751953125,0.003345489501953125,0.003387451171875,0.0035419464111328125,0.0046234130859375,0.0033473968505859375,0.003200531005859375,0.003185272216796875,0.0031719207763671875,0.0034027099609375,0.003505706787109375,0.0027637481689453125,0.0028896331787109375,0.002811431884765625,0.001132965087890625,0,0.0012388229370117188,0.003753662109375,0.003055572509765625,0.00469970703125,0.0045013427734375,0.003604888916015625,0.0037212371826171875,0.0033740997314453125,0.0031147003173828125,0.0030307769775390625,0.004970550537109375,0.004711151123046875,0.005405426025390625,0.004215240478515625,0.00485992431640625,0.004673004150390625,0.004486083984375,0.005016326904296875,0.005809783935546875,0.00415802001953125,0.004852294921875,0.004398345947265625,0.003814697265625,0.004848480224609375,0.00569915771484375,0.004665374755859375,0.004932403564453125,0.00464630126953125,0.005771636962890625,0.00566864013671875,0.004047393798828125,0.0038661956787109375,0.0034046173095703125,0.0037212371826171875,0.003673553466796875,0.004001617431640625,0.003627777099609375,0.00396728515625,0.003631591796875,0.003993988037109375,0.004055023193359375,0.003437042236328125,0.0035419464111328125,0.003292083740234375,0.0035305023193359375,0.003955841064453125,0.0032787322998046875,0.004261016845703125,0.004215240478515625,0.004489898681640625,0.00418853759765625,0.00388336181640625,0.004451751708984375,0.005645751953125,0.00574493408203125,0.005802154541015625,0.005741119384765625,0.00562286376953125,0.005466461181640625,0.004497528076171875,0.006343841552734375,0.00847625732421875,0.00983428955078125,0.006641387939453125,0.007152557373046875,0.005702972412109375,0.00402069091796875,0.0048065185546875,0.005306243896484375,0.005008697509765625,0.003917694091796875,0.004058837890625,0.0050811767578125,0.0059967041015625,0.005725860595703125,0.00545501708984375,0.0053863525390625,0.0063323974609375,0.00800323486328125,0.006038665771484375,0.0055694580078125,0.004940032958984375,0.00568389892578125,0.0064544677734375,0.006923675537109375,0.003856658935546875,0.004486083984375,0.004596710205078125,0.005584716796875,0.00417327880859375,0.00506591796875,0.00417327880859375,0.00626373291015625,0.006275177001953125,0.005420684814453125,0.00536346435546875,0.004497528076171875,0.005008697509765625,0.004222869873046875,0.00394439697265625,0.00537872314453125,0.004764556884765625,0.0040740966796875,0.004024505615234375,0.0033550262451171875,0.0033321380615234375,0.0033111572265625,0.00384521484375,0.004016876220703125,0.0035953521728515625,0.0035648345947265625,0.003505706787109375,0.0033779144287109375,0.0028476715087890625,0.00318145751953125,0.0038204193115234375,0.00388336181640625,0.0033245086669921875,0.003681182861328125,0.0038547515869140625,0.0026683807373046875,0.0027217864990234375,0.0037212371826171875,0.004154205322265625,0.0030422210693359375,0.0037822723388671875,0.00301361083984375,0.003559112548828125,0.003360748291015625,0.0037899017333984375,0.0037441253662109375,0.004543304443359375,0.004276275634765625,0.0035686492919921875,0.004192352294921875,0.004547119140625,0.0046539306640625,0.0045928955078125,0.004306793212890625,0.00400543212890625,0.0054931640625,0.005100250244140625,0.004669189453125,0.00420379638671875,0.00496673583984375,0.005290985107421875,0.00432586669921875,0.0034637451171875,0.004283905029296875,0.005062103271484375,0.00516510009765625,0.006114959716796875,0.00777435302734375,0.00846099853515625,0.0075531005859375,0.0067138671875,0.006267547607421875,0.0058135986328125,0.00466156005859375,0.005397796630859375,0.0051116943359375,0.00586700439453125,0.00567626953125,0.00608062744140625,0.007091522216796875,0.00814056396484375,0.00563812255859375,0.00677490234375,0.00807952880859375,0.0077362060546875,0.00896453857421875,0.008758544921875,0.00707244873046875,0.0062713623046875,0.00714874267578125,0.005523681640625,0.00638580322265625,0.00695037841796875,0.00548553466796875,0.0062103271484375,0.00579071044921875,0.00586700439453125,0.006786346435546875,0.006771087646484375,0.0082855224609375,0.009674072265625,0.006679534912109375,0.0065460205078125,0.005889892578125,0.00598907470703125,0.006999969482421875,0.006359100341796875,0.006671905517578125,0.006809234619140625,0.0068206787109375,0.007579803466796875,0.0060272216796875,0.004291534423828125,0.005462646484375,0.0089111328125,0.0165863037109375,0.01424407958984375,0.00951385498046875,0.007450103759765625,0.00734710693359375,0.0067138671875,0.006229400634765625,0.006290435791015625,0.00600433349609375,0.005573272705078125,0.00745391845703125,0.00884246826171875,0.00934600830078125,0.0088348388671875,0.006137847900390625,0.0036029815673828125,0.004215240478515625,0.006267547607421875,0.006381988525390625,0.0057373046875,0.00667572021484375,0.0071563720703125,0.006641387939453125,0.0052947998046875,0.005565643310546875,0.005771636962890625,0.00507354736328125,0.0067138671875,0.005817413330078125,0.00628662109375,0.006603240966796875,0.00739288330078125,0.0098114013671875,0.009979248046875,0.0091400146484375,0.005939483642578125,0.00534820556640625,0.00603485107421875,0.007236480712890625,0.005199432373046875,0.005519866943359375,0.00818634033203125,0.00884246826171875,0.00920867919921875,0.00872039794921875,0.008026123046875,0.00843048095703125,0.006374359130859375,0.007167816162109375,0.00682830810546875,0.00666046142578125,0.00567626953125,0.008026123046875,0.00592803955078125,0.005863189697265625,0.006103515625,0.006328582763671875,0.00592041015625,0.005336761474609375,0.004314422607421875,0.004497528076171875,0.004268646240234375,0.0035800933837890625,0.0034008026123046875,0.00360107421875,0.003849029541015625,0.0035228729248046875,0.004241943359375,0.004154205322265625,0.00443267822265625,0.003978729248046875,0.003932952880859375,0.00507354736328125,0.005046844482421875,0.0054931640625,0.00550079345703125,0.0047607421875,0.004673004150390625,0.005443572998046875,0.004840850830078125,0.005565643310546875,0.005535125732421875,0.006732940673828125,0.005382537841796875,0.005825042724609375,0.006046295166015625,0.005260467529296875,0.004970550537109375,0.004978179931640625,0.003971099853515625,0.0043792724609375,0.004302978515625,0.003692626953125,0.0038909912109375,0.00382232666015625,0.0034770965576171875,0.003299713134765625,0.0030460357666015625,0.003265380859375,0.0030155181884765625,0.0031986236572265625,0.0034332275390625,0.0032958984375,0.003696441650390625,0.0035457611083984375,0.0034122467041015625,0.004302978515625,0.004055023193359375,0.004119873046875,0.004421234130859375,0.004497528076171875,0.0045928955078125,0.004344940185546875,0.004848480224609375,0.0056915283203125,0.006198883056640625,0.0060272216796875,0.0072021484375,0.007465362548828125,0.005725860595703125,0.005458831787109375,0.005252838134765625,0.006195068359375,0.005771636962890625,0.005489349365234375,0.00443267822265625,0.00414276123046875,0.00432586669921875,0.0050201416015625,0.004909515380859375,0.003215789794921875,0.004528045654296875,0.004459381103515625,0.004352569580078125,0.004810333251953125,0.004940032958984375,0.0058746337890625,0.00643157958984375,0.00583648681640625,0.005290985107421875,0.004589080810546875,0.00385284423828125,0.005451202392578125,0.0051727294921875,0.005146026611328125,0.004718780517578125,0.00469207763671875,0.004741668701171875,0.0055389404296875,0.005458831787109375,0.004398345947265625,0.004749298095703125,0.005126953125,0.00626373291015625,0.005733489990234375,0.006656646728515625,0.00670623779296875,0.00787353515625,0.007083892822265625,0.0048675537109375,0.0062255859375,0.006603240966796875,0.0060577392578125,0.007091522216796875,0.007495880126953125,0.00536346435546875,0.00606536865234375,0.005390167236328125,0.005214691162109375,0.004756927490234375,0.006519317626953125,0.006603240966796875,0.00731658935546875,0.006893157958984375,0.00501251220703125,0.0041351318359375,0.0037288665771484375,0.004486083984375,0.0041351318359375,0.004009246826171875,0.00437164306640625,0.0032138824462890625,0.0029163360595703125,0.004116058349609375,0.003543853759765625,0.003070831298828125,0.0030994415283203125,0.0037078857421875,0.003818511962890625,0.00432586669921875,0.004779815673828125,0.0032672882080078125,0.004276275634765625,0.00440216064453125,0.004093170166015625,0.004703521728515625,0.004535675048828125,0.00450897216796875,0.0038604736328125,0.004150390625,0.003772735595703125,0.003963470458984375,0.004886627197265625,0.0045166015625,0.003810882568359375,0.004486083984375,0.004741668701171875,0.0038585662841796875,0.0032501220703125,0.00396728515625,0.004840850830078125,0.00569915771484375,0.006664276123046875,0.0047454833984375,0.00510406494140625,0.006084442138671875,0.005767822265625,0.004795074462890625,0.004550933837890625,0.004180908203125,0.004207611083984375,0.004364013671875,0.00447845458984375]',
  ),
);
