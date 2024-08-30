import Link from 'next/link';

export default function Terms() {
  return (
    <div className="mx-auto max-w-[700px]">
      <h1 className="mb-6 text-center text-2xl font-bold">利用規約</h1>
      <section className="mb-8">
        <h2 className="mb-2 text-lg font-bold">ご利用条件</h2>
        <p className="mb-3">
          みんなのエンジニアクイズ（以下、当サイト）はYuki
          Arai（以下、当方）またはその代理人が管理・運営しています。
        </p>
        <p className="mb-3">
          本ウェブサイトをご利用になる前に、以下の条件をよくお読みになり、これらの条件に同意された場合のみ、本ウェブサイトをご利用ください。これらの条件に同意されない場合は、本ウェブサイトをご利用にならないでください。
        </p>
        <p>
          また、当方では予告なしに当サイトの利用条件を変更することもありますので、最新情報をご確認ください。
        </p>
      </section>
      <section className="mb-8">
        <h2 className="mb-2 text-lg font-bold">著作権について</h2>
        <p className="mb-3">
          WEB上で公開されている当サイトのコンテンツ（情報、資料、画像、音声、内容、商標、ロゴなど）の著作権、商標権、その他の知的財産権は、個別に特段の明示がない限り、当方に帰属し、各国の著作権法、各種条約およびその他の法律で保護されています。
        </p>
        <p>
          営利、非営利を問わず、このウェブサイトのコンテンツ（情報、資料、映像、音声、内容、商標、ロゴなど）を法律上許容される範囲を超えて複製、転用、販売することや、これらの情報の一部または全部を改変して転用、複製、アップロードすることを禁止します。
        </p>
      </section>
      <section className="mb-8">
        <h2 className="mb-2 text-lg font-bold">当サイトのクイズについて</h2>
        <p className="mb-3">
          当サイトで掲載されているクイズは、ユーザーが作ったクイズを当方が掲載しているものです。
        </p>
      </section>
      <section className="mb-8">
        <h2 className="mb-2 text-lg font-bold">掲載情報について</h2>
        <p className="mb-3">
          当サイトに情報を掲載する際には細心の注意を払っておりますが、コンテンツの正確性、有効性、お客様の目的への適合性、安全性などについて保証するものではありません。
        </p>
        <p className="mb-3">
          当ウェブサイトの情報やコンテンツは、予告なく変更または削除されることがあります。また、本ウェブサイトの運営自体を中断または中止させていただくことがあります。
        </p>
        <p>
          なお、当方は理由の如何に関わらず、情報や掲載内容の変更・削除、および当ウェブサイトの運営の中断・中止によって生じるいかなる損害についても責任を負うものではありません。
        </p>
      </section>
      <section className="mb-8">
        <h2 className="mb-2 text-lg font-bold">免責事項</h2>
        <p className="mb-3">
          このウェブサイトのご利用は、お客様ご自身の責任において行われるものとします。当方は、このウェブサイトの利用により発生した直接的または間接的な損失や損害について、一切の責任を負いません。
        </p>
      </section>
      <section className="mb-8">
        <h2 className="mb-2 text-lg font-bold">
          利用規約についてのお問い合わせ
        </h2>
        <p className="mb-3">
          当サイトのサイトポリシーに関するご質問は、お問い合わせからお願いいたします。
        </p>
        <Link
          href="https://smz97hiro.xsrv.jp/contact/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          お問い合わせ
        </Link>
      </section>
      <p className="text-center text-sm">最終更新日：2024年8月30日</p>
    </div>
  );
}
